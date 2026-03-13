import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, clearCredentials } from "@/store/slices/authSlice";
import { setFirstLaunch } from "@/store/slices/appSlice";
import { getTokens } from "@/utils/storage";
import { APP_INITIALIZED } from "@/constants/config";
// import { INTRO_SHOWN } from "@/constants/config";

export const useHydrate = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydrate = async () => {
      const introFlag = await AsyncStorage.getItem(APP_INITIALIZED);
      dispatch(setFirstLaunch(introFlag === null));

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
