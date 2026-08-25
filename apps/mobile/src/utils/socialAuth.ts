/* eslint-disable no-console */
import * as AppleAuthentication from "expo-apple-authentication";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import { googleSignInConfig } from "@/config/google";
import { showToast } from "@/utils/toast";
import { AppLogger } from "./applogger";

export const handleGoogleLogin = async () => {
  try {
    GoogleSignin.configure(googleSignInConfig);
    // await GoogleSignin.hasPlayServices();
    const res = await GoogleSignin.signIn();
    AppLogger.log(JSON.stringify(res), "response");
    if ((res as any).type === "cancelled") {
      return null;
    }

    return res;
  } catch (error: any) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          showToast({
            type: "error",
            title: "Error",
            message: "Google Play Services not available",
          });
          break;
        default:
          AppLogger.error("Google Login Error:", error);
      }
    } else {
      AppLogger.error("Google Login Error:", error);
    }
  }
};

// FIXME: apple pay auth not work. split the code @/utils/socialAuth
export const handleAppleLogin = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    return credential;
  } catch (error: any) {
    if (error.code === "ERR_CANCELED" || error.code === "ERR_REQUEST_CANCELED") {
      // User canceled the sign-in flow
    } else {
      // Handle other errors
      AppLogger.error("Apple Login Error:", error);
      showToast({
        type: "error",
        title: "Error",
        message: error.message,
      });
    }
  }
};
