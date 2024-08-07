import { spacing } from "@/theme/spacing";
import { textVariants } from "@/theme/textVariants";
import { Palette } from "@/theme/colors";
import { ImagesType } from "@/theme/images";

export type HexColor = `#${string}`;

export type COLORS = Palette & Record<string, HexColor>;

export type Theme = {
  colors: COLORS;
  typography: Record<string, unknown>;
  breakpoints: Record<string, unknown>;
  spacing: typeof spacing;
  textVariants: typeof textVariants;
  images: ImagesType;
};
