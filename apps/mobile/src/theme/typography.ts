import gothamSsmMedium from "../../assets/fonts/GothamSSm-Medium.otf";
import gothamRoundedBold from "../../assets/fonts/GothamRounded-Bold.otf";
import poppinsRegular from "../../assets/fonts/Poppins-Regular.ttf";
import poppinsMedium from "../../assets/fonts/Poppins-Medium.ttf";
import poppinsSemibold from "../../assets/fonts/Poppins-SemiBold.ttf";
import poppinsBold from "../../assets/fonts/Poppins-Bold.ttf";

export type Fonts =
  | "alata"
  | "aclonica"
  | "poppinsRegular"
  | "poppinsMedium"
  | "poppinsSemibold"
  | "poppinsBold";

export const typography: Record<Fonts, string> = {
  alata: "Alata-Regular",
  aclonica: "Aclonica-Regular",
  poppinsRegular: "Poppins-Regular",
  poppinsMedium: "Poppins-Medium",
  poppinsSemibold: "Poppins-SemiBold",
  poppinsBold: "Poppins-Bold",
};

export const customFontsToLoad = {
  gothamRoundedBold,
  gothamSsmMedium,
  poppinsRegular,
  poppinsMedium,
  poppinsSemibold,
  poppinsBold,
};
