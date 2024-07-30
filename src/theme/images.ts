import { ImageSourcePropType } from "react-native";

export const images = {
  appLogo: require("@/assets/logo.png") as ImageSourcePropType,
  percent: require("@/assets/percent.png") as ImageSourcePropType,
  backgroundTexture: require("@/assets/Bg_texture.png") as ImageSourcePropType,
  appleIcon: require("@/assets/signIn/appleIcon.png") as ImageSourcePropType,
  fbIcon: require("@/assets/signIn/facebookIcon.png") as ImageSourcePropType,
  gmailIcon: require("@/assets/signIn/gmailIcon.png") as ImageSourcePropType,
  emailIcon: require("@/assets/signIn/emailIcon.png") as ImageSourcePropType,
};
export type ImagesType = typeof images;
// export type Image = keyof ImagesType;
