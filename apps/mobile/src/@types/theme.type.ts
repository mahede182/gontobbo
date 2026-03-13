import { spacing } from "@/theme/spacing";
import { textVariants } from "@/theme/textVariants";
import { Palette } from "@/theme/colors";
import { ImagesType } from "@/theme/images";

export type Theme = {
  colors: Palette;
  typography: Record<string, unknown>;
  breakpoints: Record<string, { width: number; height: number } | number>;
  spacing: typeof spacing;
  textVariants: typeof textVariants;
  images: ImagesType;
};
