/* google sign in config
    <> config from firebase 1. google-services.json 
    <> 2. GoogleServices-Info.plist
*/
export const googleSignInConfig = {
  webClientId: process.env.WEB_CLIENT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: process.env.IOS_CLIENT_ID,
  profileImageSize: 160,
};
