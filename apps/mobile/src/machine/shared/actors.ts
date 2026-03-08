/* eslint-disable import/no-unresolved */
import { fromCallback, fromPromise } from "xstate";
import { getCurrentRouteName, navigationRef } from "@/utils/helper";
import axios from "axios";
import { AUTH_URL } from "@/constants/urls";

export const navigationSubscriber = fromCallback(({ sendBack }) => {
  const unsubscribe = navigationRef.addListener("state", (_event) => {
    const screenRoute = getCurrentRouteName();

    if (screenRoute) {
      sendBack({ type: "NAVIGATE", screen: screenRoute });
    }
  });

  return unsubscribe;
});

export const signIn = fromPromise(async ({ input: { user, password } }) => {
  const response = await axios.post(`${AUTH_URL}/login`, {
    username: user,
    password: password,
    expiresInMins: 30,
  });
  return { status: "success", user: response.data };
});
