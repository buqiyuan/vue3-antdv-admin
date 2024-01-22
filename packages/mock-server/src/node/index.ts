/* eslint-disable @typescript-eslint/ban-ts-comment */
import { randomUUID } from 'node:crypto';
import { HttpHandler, handleRequest } from 'msw';
import { Emitter } from 'strict-event-emitter';
import { Headers } from 'headers-polyfill';
import { encodeBuffer } from '@mswjs/interceptors';
import type { IncomingHttpHeaders } from 'node:http';
import type { Connect } from 'vite';

const emitter = new Emitter();

async function transformReadableStramToUint8Array(stream: ReadableStream): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(new Uint8Array(value));
  }

  let totalLength = 0;
  for (let i = 0; i < chunks.length; i++) {
    totalLength += chunks[i].length;
  }

  const result = new Uint8Array(totalLength);

  let offset = 0;
  for (let i = 0; i < chunks.length; i++) {
    result.set(chunks[i], offset);
    offset += chunks[i].length;
  }

  return result;
}

const sanitizeHeaders = (headers: IncomingHttpHeaders) =>
  Object.entries({ ...headers }).reduce((acc, [key, value]) => {
    if (typeof key === 'string' && !key.startsWith(':')) {
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {});

export const createNodeMiddleware =
  (serverOrigin = `http://localhost`) =>
  (...handlers: HttpHandler[]): Connect.NextHandleFunction => {
    return async (req, res, next) => {
      if (!req.method || !req.url) {
        next();
      } else {
        let requestBody;
        if (!['GET', 'HEAD'].includes(req.method)) {
          requestBody = encodeBuffer(
            // @ts-ignore
            typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
          );
        }

        // Treat all relative URLs as the ones coming from the server.
        const mockedRequest = new Request(new URL(req.url, serverOrigin), {
          method: req.method,
          headers: new Headers(sanitizeHeaders(req.headers)),
          credentials: 'omit',
          body: requestBody,
        });

        await handleRequest(
          mockedRequest,
          randomUUID(),
          handlers,
          {
            onUnhandledRequest: () => null,
          },
          // @ts-ignore
          emitter,
          {
            resolutionContext: {
              /**
               * @note Resolve relative request handler URLs against
               * the server's origin (no relative URLs in Node.js).
               */
              baseUrl: serverOrigin,
            },
            async onMockedResponse(mockedResponse) {
              const { status, statusText, headers, body } = mockedResponse;
              res.statusCode = status;
              headers.forEach((value, name) => {
                res.setHeader(name, value);
              });

              // ReadableStream to Uint8Array
              let returnBody;
              if (body) returnBody = await transformReadableStramToUint8Array(body);
              res.end(returnBody ? returnBody : statusText);
            },
            onPassthroughResponse() {
              next();
            },
          },
        );
      }
    };
  };
