/* eslint-disable import/no-unresolved */
import { fromCallback, fromPromise } from "xstate";
import { getCurrentRouteName, navigationRef } from "@/utils/helper";
import { login } from "@/api/auth";

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
  const result = await login(user, password);
  return { status: "success", user: result.user };
});
