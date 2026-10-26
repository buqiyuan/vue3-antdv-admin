import { ref } from 'vue';

/** Access token shared by the user store and the HTTP client without importing either side. */
export const accessToken = ref<string>();

/** Logged-in user id. The SSE client reads it without importing the user store. */
export const currentUserId = ref<string | number>();

type PermsRefresher = () => void;
let permsRefresher: PermsRefresher | undefined;

export function registerPermsRefresher(handler: PermsRefresher) {
  permsRefresher = handler;
}

export function requestPermsRefresh() {
  permsRefresher?.();
}

/** Backend reachability. The SSE store watches this; the HTTP client only writes it. */
export const serverConnected = ref(true);

type UnauthorizedHandler = () => void;

const unauthorizedHandlers = new Set<UnauthorizedHandler>();

export function onUnauthorized(handler: UnauthorizedHandler) {
  unauthorizedHandlers.add(handler);
  return () => {
    unauthorizedHandlers.delete(handler);
  };
}

export function notifyUnauthorized() {
  unauthorizedHandlers.forEach(handler => handler());
}
