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

---

## Config

```ts
interface VitePluginMswOptions {
  handlers?: RequestHandler[];
  mode?: 'browser' | 'node';
  build?: boolean;
}
```

### Handlers

- Optional

MSW handlers. More information on how to define these: https://mswjs.io/docs/getting-started/mocks

### Mode

- Optional
- Default: `browser`

#### Browser

To start MSW in the client, please follow the [Configure worker step](https://mswjs.io/docs/getting-started/integrate/browser#configure-worker) and [Start worker step](https://mswjs.io/docs/getting-started/integrate/browser#start-worker) in the MSW docs. The `mockServiceWorker.js` file will be provided by the Vite Dev Server.

##### Example vite application

```ts
import { enableMocking } from '@admin-pkg/vite-plugin-msw';
import { HttpHandler } from 'msw';

const modules = import.meta.glob<any>('./**/*.ts', {
  eager: true,
});

export const setupMock = async () => {
  const handlers = Object.values(modules).reduce<HttpHandler[]>((prev, curr) => {
    const arr = curr?.default;
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (item instanceof HttpHandler) {
          prev.push(item);
        }
      });
    }
    return prev;
  }, []);
  // console.log('handlers', handlers);
  await enableMocking(handlers);
};
```

#### Node

This will handle the mocked service worker handlers via a Vite Dev Server plugin.

##### Add to Vite config

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

### Build

- Optional
- Default: `false`

A true value will output MSW's `mockServiceWorker.js` file to the Vite build directory, in case if MSW is needed in production.

---
