import { createNodeMiddleware } from './node/';
import { buildMswForBrowser, createBrowserMiddleware } from './browser/vitePlugin';
import type { HttpHandler } from 'msw';
import type { PluginOption } from 'vite';

export interface VitePluginMswOptions {
  mode?: 'browser' | 'node';
  handlers?: HttpHandler[];
  build?: boolean;
}

interface BrowserIntegrationOptions {
  build?: boolean;
}

const browserIntegration = ({ build }: BrowserIntegrationOptions): PluginOption => {
  let outDir;
  return {
    name: 'vite-plugin-msw:browser-integration',
    configureServer(devServer) {
      const { isProduction } = devServer.config;
      if (!isProduction) {
        devServer.middlewares.use(createBrowserMiddleware());
      }
    },
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async closeBundle() {
      const isProduction = process.env.NODE_ENV === 'production';
      if (isProduction && build) {
        await buildMswForBrowser({ outDir });
      }
    },
  };
};

const getNodeIntegration = (handlers: HttpHandler[]): PluginOption => {
  return {
    name: 'vite-plugin-msw:node-integration',
    configureServer(devServer) {
      devServer.middlewares.use(createNodeMiddleware()(...handlers));
    },
  };
};

function vitePluginMsw(
  options: Omit<VitePluginMswOptions, 'handlers'> & { mode?: 'browser' },
): PluginOption;
function vitePluginMsw(options: VitePluginMswOptions): PluginOption {
  const { mode = 'browser', handlers = [], build = false } = options;
  if (mode === 'node') {
    return getNodeIntegration(handlers);
  } else {
    return browserIntegration({ build });
  }
}

export default vitePluginMsw;
