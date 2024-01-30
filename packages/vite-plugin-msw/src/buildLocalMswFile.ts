import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const require = createRequire(import.meta.url);
const swFileName = 'mockServiceWorker.js';
const mswDir = require.resolve(`msw`);
const mswPath = resolve(mswDir, `../../${swFileName}`);
const localMswPath = resolve(__dirname, swFileName);

const replaceCodeParts = [
  {
    from: 'const INTEGRITY_CHECKSUM = ',
    to: `
// Inject by @admin-pkg/vite-plugin-msw
import { isMatchHandler } from './utils/isMatchHandler';
const INTEGRITY_CHECKSUM = `,
  },
  {
    from: `self.addEventListener('message', async function (event) {`,
    to: `
self.addEventListener('message', async function (event) {
  // Inject by @admin-pkg/vite-plugin-msw
  if (event.data?.type === 'updateMockHeaders') {
    globalThis.mockHeaders = event.data.mockHeaders || [];
    // console.log('globalThis.mockHeaders', globalThis.mockHeaders);
  }
`,
  },
  {
    from: `
self.addEventListener('fetch', function (event) {
  const { request } = event`,
    to: `
self.addEventListener('fetch', function (event) {
  const { request } = event

  // Inject by @admin-pkg/vite-plugin-msw
  const isMockRequest = isMatchHandler(request);
  // console.log('isMockRequest', request.url, isMockRequest);
  if (isMockRequest === false) {
    return;
  }
`,
  },
];

export const genLocalMswFile = async () => {
  const swContent = await readFile(mswPath, { encoding: 'utf8' });

  const newSwContent = replaceCodeParts.reduce((prev, { from, to }) => {
    return prev.replace(from, to);
  }, swContent);

  await writeFile(localMswPath, newSwContent);
};
