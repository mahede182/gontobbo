/* eslint-disable import/no-unresolved */
import { fromCallback } from "xstate";
import { getCurrentRouteName, navigationRef } from "@/utils/helper";

export const navigationSubscriber = fromCallback(({ sendBack }) => {
  const unsubscribe = navigationRef.addListener("state", (_event) => {
    const screenRoute = getCurrentRouteName();

    if (screenRoute) {
      sendBack({ type: "NAVIGATE", screen: screenRoute });
    }
  });

  return unsubscribe;
});
