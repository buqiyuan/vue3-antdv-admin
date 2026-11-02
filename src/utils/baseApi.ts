// Pure helpers. vite.config.ts imports this module while it is loading, before
// Vite defines `import.meta.env`, so this file must not read `import.meta.env`.

/** Public nest-admin demo. Production builds use this when no API origin is configured. */
export const DEMO_API_ORIGIN = 'https://nest-admin-api.pages.dev';

function unwrapQuotes(value: string): string {
  if (value.length < 2) return value;
  const quote = value[0];
  if ((quote === '"' || quote === "'") && value.endsWith(quote)) return value.slice(1, -1).trim();
  return value;
}

/** Trim and drop one layer of wrapping quotes copied from an env file. */
export function normalizeConfiguredApiUrl(configured: string | undefined | null): string {
  if (typeof configured !== 'string') return '';
  return unwrapQuotes(configured.trim());
}

/**
 * A blank platform variable must not count as a configured API origin.
 * Vite gives existing `process.env` values priority over `.env*` files, so
 * Cloudflare Pages (or any CI) can wipe `.env.production` with `VITE_BASE_API_URL=""`.
 */
export function isBlankApiUrlEnv(configured: string | undefined): boolean {
  return configured !== undefined && normalizeConfiguredApiUrl(configured) === '';
}

/**
 * Keep any non-empty value, including dev `/api` and a self-hosted origin.
 * Production with nothing configured falls back to the public demo API so axios
 * does not call same-origin `/api` (Pages would return the SPA HTML).
 */
export function resolveBaseApiUrl(configured: string | undefined | null, prod: boolean): string {
  const value = normalizeConfiguredApiUrl(configured);
  if (value) return value;
  return prod ? DEMO_API_ORIGIN : '';
}
