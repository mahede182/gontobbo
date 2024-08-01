// src/screens/Home/component/Tag.tsx
import { Image, StyleSheet } from "react-native";
import React from "react";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

type Props = {
  icon: any;
  label: string;
  active?: boolean;
};

const Tag = ({ icon, label, active }: Props) => {
  return (
    <Box style={styles.container(active)}>
      <Image
        source={icon}
        style={styles.icon}
        tintColor={active ? "#fff" : "#000"}
      />
      <RestyleText style={styles.label(active)}>{label}</RestyleText>
    </Box>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: (active: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: active ? colors.purpleDark : "#fff",
    borderWidth: 1,
    borderColor: colors.greyLight3,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  }),
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: (active: boolean) => ({
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
    color: active ? "#fff" : "#000",
  }),
});
