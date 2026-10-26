function joinUrl(base: string, path: string) {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/** Listen for nest-admin SSE menu/permission pushes. EventSource cannot set headers, so the existing API takes the access token as a query param. */
export function connectMenuStream(uid: number, token: string, onUpdate: () => void) {
  const url = joinUrl(
    import.meta.env.VITE_BASE_API_URL,
    `/api/sse/${uid}?token=${encodeURIComponent(token)}`,
  );
  const source = new EventSource(url);

  source.onmessage = (event) => {
    try {
      const payload = JSON.parse(String(event.data)) as { type?: string };
      if (payload.type === "updatePermsAndMenus") onUpdate();
      if (payload.type === "close") source.close();
    } catch {
      // ping frames are not JSON
    }
  };

  return () => source.close();
}
