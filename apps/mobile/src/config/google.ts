/* google sign in config
    <> config from firebase 1. google-services.json 
    <> 2. GoogleServices-Info.plist
*/
export const googleSignInConfig = {
  webClientId: "228779477149-htkbnhk730s7sssrj68stuntmiglhsu7.apps.googleusercontent.com",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: process.env.IOS_CLIENT_ID,
  profileImageSize: 160,
};
