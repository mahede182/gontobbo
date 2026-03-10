import api from "./client";
import { AuthResult, User, ApiResponse } from "@/@types/auth.type";
import { saveTokens, saveItem, getItem, getTokens, clearTokens } from "@/utils/storage";
import { STORAGE_KEYS } from "@/@types/storage.type";

// ─── Register ───────────────────────────────────────────────────────────────

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone?: string,
) => {
  const { data } = await api.post<AuthResult>("/auth/register", {
    email,
    password,
    firstName,
    lastName,
    phone,
  });
  await saveTokens(data.data.accessToken, data.data.refreshToken);
  await saveItem(STORAGE_KEYS.USER, data.data.user);
  return data.data;
};

// ─── Login ──────────────────────────────────────────────────────────────────

export const login = async (email: string, password: string) => {
  const { data } = await api.post<AuthResult>("/auth/login", { email, password });
  await saveTokens(data.data.accessToken, data.data.refreshToken);
  await saveItem(STORAGE_KEYS.USER, data.data.user);
  return data.data;
};

// ─── Google Login ───────────────────────────────────────────────────────────

export const googleLogin = async (idToken: string) => {
  const { data } = await api.post<AuthResult>("/auth/google", { idToken });
  await saveTokens(data.data.accessToken, data.data.refreshToken);
  await saveItem(STORAGE_KEYS.USER, data.data.user);
  return data.data;
};

// ─── Apple Login ────────────────────────────────────────────────────────────

export const appleLogin = async (params: {
  identityToken: string;
  user?: string;
  email?: string | null;
  fullName?: { givenName?: string | null; familyName?: string | null };
}) => {
  const { data } = await api.post<AuthResult>("/auth/apple", params);
  await saveTokens(data.data.accessToken, data.data.refreshToken);
  await saveItem(STORAGE_KEYS.USER, data.data.user);
  return data.data;
};

// ─── Get Current User ───────────────────────────────────────────────────────

export const getMe = async () => {
  const { data } = await api.get<ApiResponse<User>>("/auth/me");
  return data.data;
};

// ─── Logout ─────────────────────────────────────────────────────────────────

export const logout = async () => {
  const tokens = await getTokens();
  try {
    await api.post("/auth/logout", { refreshToken: tokens?.refreshToken });
  } catch {
    // Logout even if server call fails
  }
  await clearTokens();
};

// ─── Helpers ────────────────────────────────────────────────────────────────

export const saveUser = async (user: unknown) => {
  await saveItem(STORAGE_KEYS.USER, user);
};

export const getUserAsync = async () => {
  return await getItem(STORAGE_KEYS.USER);
};
