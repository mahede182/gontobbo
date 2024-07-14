import { spacing } from "../theme/spacing";
import { textVariants } from "../theme/textVariants";

export const COLORS = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",
  greenLight: "#6FCF97",
  greenPrimary: "#00A86B",
  greenDark: "#00783E",
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  redLight: "#FFA8A8",
} as const;

export type Colors = keyof typeof COLORS;

export function isColor(key: string): key is Colors {
  return key in COLORS;
}

export type Fonts = "alata" | "aclonica";

export type Palette = typeof COLORS;

export type Theme = {
  colors: Palette;
  typography: Record<string, unknown>;
  spacing: typeof spacing;
  textVariants: typeof textVariants;
};
