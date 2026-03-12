import { StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { Box } from "@/theme";
import { colors } from "@/theme/colors";

type Props = {
  style?: ViewStyle;
};

export const Divider = ({ style }: Props) => <Box style={[styles.divider, style]} />;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.white200,
  },
});
