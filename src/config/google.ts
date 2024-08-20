/* google sign in config
    <> config from firebase 1. google-services.json 
    <> GoogleServices-Info.plist
*/
export const googleSignInConfig = {
  webClientId: process.env.WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId: process.env.IOS_CLIENT_ID,
  // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  profileImageSize: 160, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
};
