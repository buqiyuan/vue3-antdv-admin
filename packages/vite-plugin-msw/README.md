# @admin-pkg/vite-plugin-msw

Mock Service Worker browser and node integration for Vite.

## Usage

### Install

```sh
npm install --save-dev @admin-pkg/vite-plugin-msw
# yarn add --dev @admin-pkg/vite-plugin-msw
# pnpm add --save-dev @admin-pkg/vite-plugin-msw
```

### Define mocks

https://mswjs.io/docs/getting-started/mocks

### Add to Vite config

```ts
// Import plugin
import msw from '@admin-pkg/vite-plugin-msw';

// Import msw handlers
import { handlers } from '../mocks/handlers';

// Pass them to plugin
export default defineConfig({
  plugins: [msw({ handlers })],
});
```

---

## Config

```ts
interface VitePluginMswOptions {
  handlers: RequestHandler[];
  mode?: 'browser' | 'node';
  build?: boolean;
}
```

### Handlers

- Required

MSW handlers. More information on how to define these: https://mswjs.io/docs/getting-started/mocks

### Mode

- Optional
- Default: `browser`

#### Browser

To start MSW in the client, please follow the [Configure worker step](https://mswjs.io/docs/getting-started/integrate/browser#configure-worker) and [Start worker step](https://mswjs.io/docs/getting-started/integrate/browser#start-worker) in the MSW docs. The `mockServiceWorker.js` file will be provided by the Vite Dev Server.

#### Node

This will handle the mocked service worker handlers via a Vite Dev Server plugin.

### Build

- Optional
- Default: `false`

A true value will output MSW's `mockServiceWorker.js` file to the Vite build directory, in case if MSW is needed in production.

---

## Development

```
npm run dev
```

### Example vite application with plugin

```
npm run build
cd examples/with-vite
npm run dev
curl http://localhost:3000/api/health
```

### Build

```
npm run build
```
