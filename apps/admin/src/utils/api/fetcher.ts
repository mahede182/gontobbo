export const API_BASE_URL = "http://localhost:4000";

export const fetcher = async (url: string) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const res = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
