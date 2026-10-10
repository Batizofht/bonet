export async function apiPost(path: string, payload: unknown) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(path, { method: "GET" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const API_BASE = "https://api.bonet.rw/bonetBackend/backend/public";
