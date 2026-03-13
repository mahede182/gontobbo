/* google sign in config
    <> config from firebase 1. google-services.json 
    <> 2. GoogleServices-Info.plist
*/
// @ts-ignore
import { GOOGLE_CLIENT_ID, IOS_CLIENT_ID } from "@env";

export const googleSignInConfig = {
  webClientId: GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
  scopes: ["email", "profile"],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: IOS_CLIENT_ID || process.env.IOS_CLIENT_ID,
  profileImageSize: 160,
};
