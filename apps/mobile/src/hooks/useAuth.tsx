import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCredentials } from "@/store/slices/authSlice";

export function useAuth() {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(clearCredentials());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
  };
}
