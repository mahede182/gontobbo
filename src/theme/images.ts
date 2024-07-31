import { ImageSourcePropType } from "react-native";

export const images = {
  appLogo: require("@/assets/logo.png") as ImageSourcePropType,
  backgroundTexture: require("@/assets/Bg_texture.png") as ImageSourcePropType,
  home: require("@/assets/bottomTab/home.png") as ImageSourcePropType,
  homeActive:
    require("@/assets/bottomTab/homeActive.png") as ImageSourcePropType,
  explore: require("@/assets/bottomTab/explore.png") as ImageSourcePropType,
  exploreActive:
    require("@/assets/bottomTab/exploreActive.png") as ImageSourcePropType,
  offer: require("@/assets/bottomTab/offer.png") as ImageSourcePropType,
  offerActive:
    require("@/assets/bottomTab/offerActive.png") as ImageSourcePropType,
  wishlist: require("@/assets/bottomTab/wishlist.png") as ImageSourcePropType,
  wishlistActive:
    require("@/assets/bottomTab/wishlistActive.png") as ImageSourcePropType,
  profile: require("@/assets/bottomTab/profile.png") as ImageSourcePropType,
  profileActive:
    require("@/assets/bottomTab/profileActive.png") as ImageSourcePropType,
  appleIcon: require("@/assets/signIn/appleIcon.png") as ImageSourcePropType,
  fbIcon: require("@/assets/signIn/facebookIcon.png") as ImageSourcePropType,
  gmailIcon: require("@/assets/signIn/gmailIcon.png") as ImageSourcePropType,
  emailIcon: require("@/assets/signIn/emailIcon.png") as ImageSourcePropType,

  menuBtn: require("@/assets/menu_button.png") as ImageSourcePropType,
  notifiocationBtn:
    require("@/assets/notification_button.png") as ImageSourcePropType,

  magicAiBtn: require("@/assets/magic_ai_button.png") as ImageSourcePropType,
  dummyCard: require("@/assets/Home/dummyCard.png") as ImageSourcePropType,
  dummyTrip1: require("@/assets/Home/dummyTip.png") as ImageSourcePropType,
  dummyTri2: require("@/assets/Home/dummyTip2.png") as ImageSourcePropType,
  avatar1: require("@/assets/Home/avatar1.png") as ImageSourcePropType,
  avatar2: require("@/assets/Home/avatar2.png") as ImageSourcePropType,
};
export type ImagesType = typeof images;
// export type Image = keyof ImagesType;
