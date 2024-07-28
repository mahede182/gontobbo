import React from "react";
import { Text } from "react-native";
import { textVariants } from "./textVariants";
import { cardVariants } from "./cardVariants";
import {
  createBox,
  createTheme,
  createRestyleComponent,
  TextProps as RestyleTextProps,
  createVariant,
} from "@shopify/restyle";
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
  cardVariants,
});
export const Box = createBox<Theme>();

export const RestyleText = createRestyleComponent<
  RestyleTextProps<Theme> & React.ComponentProps<typeof Text>,
  Theme
>([createVariant({ themeKey: "textVariants" })], Text);

export default theme;
