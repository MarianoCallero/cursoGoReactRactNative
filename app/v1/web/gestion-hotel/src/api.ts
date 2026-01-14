// src/api.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getToken();
    if (!token) throw { status: 401, message: "No token" };
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw { status: res.status, message: data.message || "Login error" };
  }

  return data;
}

export const api = {
  login: (user: string, pass: string) =>
    request<{ token: string }>("/api/v1/login", {
      method: "POST",
      body: JSON.stringify({ user, pass }),
    }),

  hello: () => request<{ message: string }>("/api/v1/hello", {}, true),
};
