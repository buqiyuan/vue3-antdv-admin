import {
  parseQuery,
  type LocationQuery,
  type RouteLocationRaw,
  type RouteParamsRaw,
} from 'vue-router';

type QueryHashSource = {
  path: string;
  query: LocationQuery;
  hash: string;
};

/**
 * Replay a location after dynamic routes are registered.
 * `fullPath` already contains the search and hash. Using that string as `path`
 * makes vue-router ignore the embedded search/hash (and drop the hash even
 * when `query` is passed separately).
 */
export function replayRegisteredRoute(to: QueryHashSource): RouteLocationRaw {
  return {
    path: to.path,
    query: to.query,
    hash: to.hash,
    replace: true,
  };
}

/** Split `/path?a=1&b=2#hash` into the pieces vue-router will not discard. */
export function splitRoutePath(raw: string): { path: string; query: LocationQuery; hash: string } {
  const hashIndex = raw.indexOf('#');
  const hash = hashIndex >= 0 ? raw.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw;
  const queryIndex = withoutHash.indexOf('?');
  const path = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const search = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : '';
  return {
    path: path.startsWith('/') ? path : `/${path}`,
    query: search ? parseQuery(search) : {},
    hash,
  };
}

/**
 * Target of the `/redirect/:path` refresh route.
 * Callers sometimes stuff `route.fullPath` into the path param. An empty
 * redirect-route query must not wipe the search and hash embedded in that param.
 */
export function resolveRedirectTarget(options: {
  pathParam: string | string[] | undefined;
  redirectType?: string;
  query?: LocationQuery;
  hash?: string;
  params?: RouteParamsRaw;
}): RouteLocationRaw {
  const { pathParam, redirectType = 'path', query = {}, hash = '', params = {} } = options;
  const joined = Array.isArray(pathParam) ? pathParam.join('/') : (pathParam ?? '');
  if (redirectType === 'name') {
    return {
      name: joined,
      query,
      hash,
      params,
    };
  }
  const raw = joined.startsWith('/') ? joined : `/${joined}`;
  const parsed = splitRoutePath(raw);
  return {
    path: parsed.path,
    query: { ...parsed.query, ...query },
    hash: hash || parsed.hash,
  };
}
