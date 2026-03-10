import { Platform } from "react-native";

// Android emulator uses 10.0.2.2 to reach host localhost
// iOS simulator can use localhost directly
// Physical device: replace with your machine's LAN IP (e.g. 192.168.1.x)
const DEV_HOST = Platform.select({
  android: "10.0.2.2",
  default: "localhost",
});

export const BASE_URL = `http://${DEV_HOST}:4000/api`;
