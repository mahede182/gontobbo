import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { fontSizes } from "@/theme/fontSizes";

type Props = {
  id: string | number;
  icon: any;
  label: string;
  active?: boolean;
  onPress?: (label: string) => void;
};

const Tag = ({ icon, label, active = false, onPress }: Props) => (
  <TouchableOpacity
    style={[styles.container, active && styles.activeContainer]}
    onPress={() => onPress?.(label)}
    activeOpacity={0.8}>
    <Image source={icon} style={styles.icon} tintColor={active ? "#fff" : "#000"} />
    <RestyleText style={[styles.label, active && styles.activeLabel]}>{label}</RestyleText>
  </TouchableOpacity>
);

export default Tag;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: colors.white,
  },
  activeContainer: {
    backgroundColor: colors.blue800,
    borderColor: colors.blue800,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  label: {
    fontFamily: typography.poppinsMedium,
    fontSize: fontSizes.lg,
    color: colors.neutral700,
  },
  activeLabel: {
    color: colors.white,
  },
});
