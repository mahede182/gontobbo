import { spacing } from "../theme/spacing";

const COLORS = [
  "purpleLight",
  "purplePrimary",
  "purpleDark",
  "greenLight",
  "greenPrimary",
  "greenDark",
  "black",
  "white",
];
export type Colors = (typeof COLORS)[number];
export function isColor(key: string): key is Colors {
  return COLORS.includes(key as Colors);
}

export type Fonts = "alata" | "aclonica";

export type Palette = Record<Colors, string>;

export type Theme = {
  colors: Palette;
  typography: Record<string, unknown>;
  spacing: typeof spacing;
};
