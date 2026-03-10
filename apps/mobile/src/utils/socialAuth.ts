/* eslint-disable no-console */
import { Alert, Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import { googleSignInConfig } from "@/config/google";

export const handleGoogleLogin = async () => {
  GoogleSignin.configure(googleSignInConfig);
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
          console.log("No Saved Credential Found");
          break;
        case statusCodes.SIGN_IN_CANCELLED:
          console.log("Login cancelled");
          break;
        case statusCodes.ONE_TAP_START_FAILED:
          console.log("One Tap Failed");
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
  } catch (error) {
    console.log(error);
    if (error.code === "ERR_REQUEST_CANCELED") {
      // User canceled the sign-in flow
      console.log("Apple Login Canceled");
    } else {
      // Handle other errors
      console.error("Apple Login Error:", error);
      Alert.alert("Error", error.message);
    }
  }
};
