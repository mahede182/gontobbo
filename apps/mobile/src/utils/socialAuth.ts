/* eslint-disable no-console */
import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import { googleSignInConfig } from "@/config/google";
import { showToast } from "@/utils/toast";

export const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const res = await GoogleSignin.signIn();
    if ((res as any).type === "cancelled") {
      return null;
    }
    return res;
  } catch (error: any) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log("Login cancelled");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log("PLAY_SERVICES_NOT_AVAILABLE");
          break;
        default:
          console.log(error);
      }
    } else {
      console.log(error);
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
    console.log(error);
    if (error.code === "ERR_REQUEST_CANCELED") {
      // User canceled the sign-in flow
      console.log("Apple Login Canceled");
    } else {
      // Handle other errors
      console.error("Apple Login Error:", error);
      showToast({
        type: "error",
        title: "Error",
        message: error.message,
      });
    }
  }
};
