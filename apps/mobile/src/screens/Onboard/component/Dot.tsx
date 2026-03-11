import React from "react";
import { StyleSheet } from "react-native";
import { MotiView } from "moti";
import { colors } from "@/theme/colors";

interface DotProps {
  index: number;
  activeIndex: number;
}

const Dot = ({ index, activeIndex }: DotProps) => {
  const isActive = index === activeIndex;

  return (
    <MotiView
      animate={{
        width: isActive ? 28 : 8,
        backgroundColor: isActive ? colors.primary600 : colors.white,
        opacity: isActive ? 1 : 0.45,
      }}
      transition={{ type: "spring", damping: 18, stiffness: 160 }}
      style={styles.dot}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

export default Dot;
