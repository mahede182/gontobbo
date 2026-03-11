import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { colors } from "@/theme/colors";

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, children, delay = 700 }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay }}
      style={styles.sectionsContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{children}</View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  sectionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: colors.neutral700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutral600,
    marginBottom: 5,
    marginTop: 5,
  },
});

export default MenuSection;
