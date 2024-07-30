import { spacing } from "@/theme/spacing";
import { textVariants } from "@/theme/textVariants";
import { Palette } from "@/theme/colors";
import { ImagesType } from "@/theme/images";

export type Fonts = "alata" | "aclonica";

export type Theme = {
  colors: Palette;
  typography: Record<string, unknown>;
  breakpoints: Record<string, unknown>;
  spacing: typeof spacing;
  textVariants: typeof textVariants;
  images: ImagesType;
};
