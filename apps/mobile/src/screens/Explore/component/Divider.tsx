import { StyleSheet } from "react-native";
import React from "react";
import { Box } from "@/theme";
import { colors } from "@/theme/colors";

type Props = {};

export const Divider = (props: Props) => <Box style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.white200,
    marginVertical: 16,
    marginHorizontal: 16,
  },
});
