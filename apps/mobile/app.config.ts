import { ExpoConfig, ConfigContext } from "@expo/config";
import { version } from "./package.json";

const BUILD_NUMBER = 1;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "gontobbo",
  slug: "gontobbo",
  version,
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    usesAppleSignIn: true,
    bundleIdentifier: "co.mahede.gontobbo",
    googleServicesFile: "./GoogleService-Info.plist",
    buildNumber: String(BUILD_NUMBER),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "co.mahede.gontobbo",
    googleServicesFile: "./google-services.json",
    versionCode: BUILD_NUMBER,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/Poppins-Regular.ttf",
          "./assets/fonts/Poppins-Light.ttf",
          "./assets/fonts/Poppins-Bold.ttf",
        ],
      },
    ],
    "expo-apple-authentication",
    "@react-native-google-signin/google-signin",
  ],
});
