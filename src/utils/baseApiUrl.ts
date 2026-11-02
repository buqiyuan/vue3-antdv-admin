import { resolveBaseApiUrl } from './baseApi';

/** Axios / SSE origin. Blank env is unset; production then uses the public demo API. */
export const baseApiUrl = resolveBaseApiUrl(
  import.meta.env.VITE_BASE_API_URL,
  import.meta.env.PROD,
);
