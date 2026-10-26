const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

let expiredHandler: (() => void) | null = null;
let handlingExpiry = false;

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY) ?? "";
}

/**
 * Nest Admin's public login payload is `{ token }` (the access JWT).
 * A refresh token is only stored when a response actually includes one.
 * The upstream service keeps refresh tokens in the database and does not
 * expose an exchange route, so this client never calls a guessed endpoint.
 */
export function setToken(accessToken: string, refreshToken?: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  else localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function setAuthExpiredHandler(handler: () => void) {
  expiredHandler = handler;
}

export function notifyAuthExpired() {
  if (handlingExpiry) return;
  handlingExpiry = true;
  clearToken();
  expiredHandler?.();
  window.setTimeout(() => {
    handlingExpiry = false;
  }, 400);
}
