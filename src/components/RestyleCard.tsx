import {
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps,
} from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";

type Props = SpacingProps<Theme> & VariantProps<Theme, "cardVariants">;

export const RestyleCard = createRestyleComponent<Props, Theme>([
  spacing,
  createVariant({ themeKey: "cardVariants" }),
]);
