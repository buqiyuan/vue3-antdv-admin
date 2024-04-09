import { version } from 'node:process';
import http2Proxy from 'http2-proxy';
import type { Plugin, ProxyOptions } from 'vite';

const error = (message: string): never => {
  throw new Error(message);
};

export default (options?: Record<string, ProxyOptions>): Plugin => {
  let routes: Record<string, ProxyOptions>;

  if (version.startsWith('v2')) {
    console.warn(
      '[@admin-pkg/vite-plugin-http2-proxy] http2-proxy is not supported in Node.js v20.x+',
    );
    return { name: '@admin-pkg/vite-plugin-http2-proxy' };
  }

  const configure: Plugin['configureServer'] = ({ middlewares, httpServer }) => {
    const proxyOptions = options || routes;
    for (const [regexp, serverOptions] of Object.entries(proxyOptions)) {
      const { target, rewrite, headers, ws, secure = true } = serverOptions;
      if (!target) {
        continue;
      }

      const re = new RegExp(regexp);
      const urlObj = new URL(target.toString());

      if (!urlObj.pathname.endsWith('/')) {
        urlObj.pathname += '/';
      }

      const protocol = /^(http|ws)s?:$/.test(urlObj.protocol)
        ? (urlObj.protocol as 'https' | 'http')
        : error(`Invalid protocol: ${urlObj.href}`);

      const port =
        urlObj.port === ''
          ? { https: 443, http: 80 }[protocol]
          : /^\d+$/.test(urlObj.port)
            ? Number(urlObj.port)
            : error(`Invalid port: ${urlObj.href}`);

      // TODO unfinished
      if (ws && httpServer) {
        httpServer?.on('upgrade', (req, socket, head) => {
          if (req.url && re.test(req.url)) {
            const url = (rewrite?.(req.url) ?? req.url).replace(/^\/+/, '');
            const { pathname, search } = new URL(url, urlObj);

            http2Proxy.ws(
              req,
              socket,
              head,
              {
                port: 443,
                path: pathname + search,
                hostname: urlObj.hostname,
                ['rejectUnauthorized' as never]: secure,
                ...serverOptions,
              },
              (err) => {
                if (err) {
                  console.error('proxy error', err);
                  socket.destroy();
                }
              },
            );
          }
        });
      } else {
        middlewares.use((req, res, next) => {
          if (req.url && re.test(req.url)) {
            const url = (rewrite?.(req.url) ?? req.url).replace(/^\/+/, '');
            const { pathname, search } = new URL(url, urlObj);

            http2Proxy.web(
              req,
              res,
              {
                protocol,
                port,
                hostname: urlObj.hostname,
                path: pathname + search,
                onReq: async (_, options) => {
                  options.headers = {
                    ...options.headers,
                    ...headers,
                  };
                },
                ['rejectUnauthorized' as never]: secure,
                ...serverOptions,
              },
              (err) => err && next(err),
            );
          } else {
            next();
          }
        });
      }
    }
  };

  return {
    name: '@admin-pkg/vite-plugin-http2-proxy',
    config: (config) => {
      const { server } = config;
      routes = Object.entries(server?.proxy ?? {}).reduce(
        (prev, [key, value]) => {
          if (typeof value === 'string') {
            prev[key] = {
              target: value,
            };
          } else {
            prev[key] = value;
          }
          return prev;
        },
        {} as Record<string, ProxyOptions>,
      );

      if (server) {
        server.proxy = undefined;
      }
      return config;
    },
    configureServer: configure,
    // @ts-ignore
    configurePreviewServer: configure,
  };
};
