// import * as AppleAuthentication from "expo-apple-authentication";
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from "react-native-fbsdk-next";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";
import { googleSignInConfig } from "@/config/google";

export const handleFacebookSignIn = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(
      ["public_profile", "email"],
      "limited",
      "my_nonce",
    );
    console.log(result);

    if (Platform.OS === "ios") {
      const result = await AuthenticationToken.getAuthenticationTokenIOS();
      console.log(result?.authenticationToken);
    } else {
      const result = await AccessToken.getCurrentAccessToken();
      console.log(result?.accessToken);
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleGoogleSignIn = async () => {
  GoogleSignin.configure(googleSignInConfig);
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo, "user info");
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
          console.log("No Saved Credential Found");
          break;
        case statusCodes.SIGN_IN_CANCELLED:
          console.log("Sign in cancel");
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
