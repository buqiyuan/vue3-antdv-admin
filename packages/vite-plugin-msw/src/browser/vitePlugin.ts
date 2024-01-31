import { readFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { Connect } from 'vite';

const swFileName = 'mockServiceWorker.js';
const localMswDistPath = resolve(__dirname, swFileName);

export const createBrowserMiddleware = (): Connect.NextHandleFunction => {
  return async (req, res, next) => {
    try {
      if (req.method !== 'GET' || req.url !== `/${swFileName}`) {
        next();
        return;
      }

      const swContent = await readFile(localMswDistPath, 'utf8');
      res.setHeader('content-type', 'application/javascript');
      res.statusCode = 200;
      res.end(swContent);
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end(error.toString());
    }
  };
};

interface BuildBrowserSupportOptions {
  outDir: string;
}

export const buildMswForBrowser = async ({ outDir }: BuildBrowserSupportOptions) => {
  const outputPath = resolve(process.cwd(), outDir, swFileName);
  await copyFile(localMswDistPath, outputPath);
};
