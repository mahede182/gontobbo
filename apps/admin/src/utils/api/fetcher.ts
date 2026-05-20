export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export const authedRequest = async (url: string, options: RequestInit = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // If the server responds with 401 Unauthorized, the token is expired or invalid.
  // Clear it and redirect to login so the user doesn't sit on a broken page.
  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || "Request failed");
  }

  return res.json();
};

export const fetcher = async (url: string) => authedRequest(url);
