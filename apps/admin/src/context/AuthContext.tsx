"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  token: string | null;
  isHydrated: boolean;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  token: null,
  isHydrated: false,
  login: () => {},
  logout: () => {},
});

/**
 * Read the persisted token synchronously on module load.
 * This avoids the 1-frame flash where token is null and the
 * auth guard in MainLayout redirects to /login.
 */
function getPersistedToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("admin_token");
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(getPersistedToken);
  const router = useRouter();

  const login = useCallback(
    (newToken: string) => {
      localStorage.setItem("admin_token", newToken);
      setToken(newToken);
      router.push("/");
    },
    [router],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setToken(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ token, isHydrated: true, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
