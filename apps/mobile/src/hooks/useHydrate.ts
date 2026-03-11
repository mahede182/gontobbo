import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, clearCredentials } from "@/store/slices/authSlice";
import { getTokens } from "@/utils/storage";

export const useHydrate = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydrate = async () => {
      try {
        const tokens = await getTokens();
        if (tokens?.accessToken) {
          const result = await fetch(`${require("@/constants/urls").BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${tokens.accessToken}` },
          });
          if (result.ok) {
            const json = await result.json();
            dispatch(setCredentials({ user: json.data }));
          } else {
            dispatch(clearCredentials());
          }
        } else {
          dispatch(clearCredentials());
        }
      } catch {
        dispatch(clearCredentials());
      }
    };

    hydrate();
  }, [dispatch]);
};
