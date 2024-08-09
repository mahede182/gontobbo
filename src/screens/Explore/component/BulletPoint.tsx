// BulletPoint.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

interface BulletPointProps {
  text: string;
  style?: any;
}

const BulletPoint: React.FC<BulletPointProps> = ({ text, style }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bullet} />
      <RestyleText style={[styles.text, style]}>{text}</RestyleText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.black,
    marginTop: 6,
    marginRight: 8,
  },
  text: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.gray,
    flex: 1,
  },
});

export default BulletPoint;
