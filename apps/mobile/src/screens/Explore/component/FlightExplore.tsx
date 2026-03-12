import React from "react";
import { StyleSheet } from "react-native";
import { Box } from "@/theme";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { fontSizes } from "@/theme/fontSizes";
import { colors } from "@/theme/colors";
import Icon from "@expo/vector-icons/Ionicons";

const FlightExplore: React.FC = () => (
  <Box
    flex={1}
    paddingHorizontal="medium"
    marginTop="twenty"
    alignItems="center"
    justifyContent="center">
    <Icon name="airplane-outline" size={56} color={colors.neutral400} />
    <GradientTitle style={styles.title}>Flight Search</GradientTitle>
    <GradientTitle style={styles.subtitle}>Coming Soon</GradientTitle>
  </Box>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: fontSizes.xxl,
    marginTop: 16,
  },
  subtitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: fontSizes.md,
    marginTop: 4,
  },
});

export default FlightExplore;
