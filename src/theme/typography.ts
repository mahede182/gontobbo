import { Fonts } from "../@types/theme.type";
import gothamSsmMedium from "../../assets/fonts/GothamSSm-Medium.otf";
import gothamRoundedBold from "../../assets/fonts/GothamRounded-Bold.otf";

export const typography: Record<Fonts, string> = {
  alata: "Alata-Regular",
  aclonica: "Aclonica-Regular",
};

export const customFontsToLoad = {
  gothamRoundedBold,
  gothamSsmMedium,
};
