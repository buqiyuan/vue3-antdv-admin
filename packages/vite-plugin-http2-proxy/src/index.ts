import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Socket } from 'node:net';
import type { Plugin, PluginOption, PreviewServer, ProxyOptions, ViteDevServer } from 'vite';
import http2Proxy from 'http2-proxy';

type ProxyTable = Record<string, ProxyOptions>;
type ServerLike = Pick<ViteDevServer, 'middlewares' | 'httpServer'> | Pick<PreviewServer, 'middlewares' | 'httpServer'>;

const invalid = (message: string): never => {
  throw new Error(message);
};

const readProxyTable = (proxy: Record<string, string | ProxyOptions> | undefined): ProxyTable => {
  return Object.entries(proxy ?? {}).reduce<ProxyTable>((prev, [key, value]) => {
    prev[key] = typeof value === 'string' ? { target: value } : value;
    return prev;
  }, {});
};

const attachProxy = (server: ServerLike, proxyOptions: ProxyTable) => {
  const { middlewares, httpServer } = server;

  for (const [regexp, serverOptions] of Object.entries(proxyOptions)) {
    const { target, rewrite, headers, ws, secure = true, timeout = 30_000 } = serverOptions;
    if (!target)
      continue;

    const re = new RegExp(regexp);
    const urlObj = new URL(target.toString());
    if (!urlObj.pathname.endsWith('/'))
      urlObj.pathname += '/';

    const protocol = urlObj.protocol === 'https:' || urlObj.protocol === 'wss:'
      ? 'https'
      : urlObj.protocol === 'http:' || urlObj.protocol === 'ws:'
        ? 'http'
        : invalid(`Invalid protocol: ${urlObj.href}`);

    const port = urlObj.port === ''
      ? (protocol === 'https' ? 443 : 80)
      : /^\d+$/.test(urlObj.port)
        ? Number(urlObj.port)
        : invalid(`Invalid port: ${urlObj.href}`);

    if (ws && httpServer) {
      httpServer.on('upgrade', (req: IncomingMessage, socket: Socket, head: Buffer) => {
        if (!req.url || !re.test(req.url))
          return;

        const url = (rewrite?.(req.url) ?? req.url).replace(/^\/+/, '');
        const { pathname, search } = new URL(url, urlObj);
        http2Proxy.ws(
          req,
          socket,
          head,
          {
            port: 443,
            path: pathname + search,
            proxyTimeout: timeout,
            hostname: urlObj.hostname,
            ['rejectUnauthorized' as never]: secure,
          },
          (err?: Error) => {
            if (err) {
              console.error('proxy error', err);
              socket.destroy();
            }
          },
        );
      });
      continue;
    }

    middlewares.use((req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => void) => {
      if (!req.url || !re.test(req.url)) {
        next();
        return;
      }

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
          proxyTimeout: timeout,
          onReq: async (_incoming, options) => {
            options.headers = {
              ...options.headers,
              ...headers,
            };
          },
          ['rejectUnauthorized' as never]: secure,
        },
        (err?: Error) => {
          if (err)
            next(err);
        },
      );
    });
  }
};

export default (options?: ProxyTable): PluginOption => {
  let routes: ProxyTable = {};

  const plugin: Plugin = {
    name: '@admin-pkg/vite-plugin-http2-proxy',
    config(config) {
      routes = options || readProxyTable(config.server?.proxy as Record<string, string | ProxyOptions> | undefined);
      if (config.server)
        Reflect.deleteProperty(config.server, 'proxy');
      return config;
    },
    configureServer(server) {
      attachProxy(server, options || routes);
    },
    configurePreviewServer(server) {
      attachProxy(server, options || routes);
    },
  };

  return plugin;
};
