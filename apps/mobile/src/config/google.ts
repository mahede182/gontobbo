/* google sign in config
    <> config from firebase 1. google-services.json 
    <> 2. GoogleServices-Info.plist
*/
// @ts-ignore
import { EXPO_PUBLIC_WEB_CLIENT_ID, EXPO_PUBLIC_IOS_CLIENT_ID } from "@env";

export const googleSignInConfig = {
  webClientId: EXPO_PUBLIC_WEB_CLIENT_ID,
  scopes: ["email", "profile"],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: EXPO_PUBLIC_IOS_CLIENT_ID,
  profileImageSize: 160,
};
