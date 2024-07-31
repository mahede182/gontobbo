// src/screens/Home/component/Tag.tsx
import { Image, StyleSheet } from "react-native";
import React from "react";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";

type Props = {
  icon: any;
  label: string;
};

const Tag = ({ icon, label }: Props) => {
  return (
    <Box style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <RestyleText style={styles.label}>{label}</RestyleText>
    </Box>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff", // Change backgroundColor to "#fff"
    borderWidth: 1,
    borderColor: colors.greyLight3,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
});
