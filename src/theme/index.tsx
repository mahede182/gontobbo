import { textVariants } from "./textVariants";
import { createBox, createText, createTheme } from "@shopify/restyle";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { Theme } from "../@types/theme.type";

export const theme: Theme = createTheme({
  colors,
  breakpoints: {},
  spacing,
  typography,
  textVariants,
});
export const Box = createBox<Theme>();
export const RestyleText = createText<Theme>();

export default theme;
