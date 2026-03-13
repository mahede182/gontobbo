import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { MotiView } from "moti";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.65;

interface PassportCardProps {
  passportData: any;
  formatDate: (date?: string) => string;
}

const PassportCard: React.FC<PassportCardProps> = ({ passportData, formatDate }) => {
  const details = [
    { label: "Passport Number", value: passportData?.passportNumber || "N/A" },
    { label: "Nationality", value: passportData?.nationality || "N/A" },
    { label: "Date of Birth", value: formatDate(passportData?.dateOfBirth) },
    { label: "Date of Issue", value: formatDate(passportData?.dateOfIssue) },
    { label: "Date of Expiry", value: formatDate(passportData?.dateOfExpiry) },
  ];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 600 }}
      style={styles.cardContainer}>
      {/* Decorative background elements */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.cardHeader}>
        <Text style={styles.passportLabel}>INTERNAL PASSPORT</Text>
        <Image
          source={require("@/assets/bottomTab/profile.png")}
          style={[styles.logo, { tintColor: colors.white }]}
        />
      </View>

      <View style={styles.cardContent}>
        {details.map((item, index) => (
          <MotiView
            key={item.label}
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 300 + index * 100 }}
            style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>{item.label}</Text>
            <Text style={styles.detailsValue}>{item.value}</Text>
          </MotiView>
        ))}
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary700,
    borderRadius: 20,
    padding: 24,
    width: CARD_WIDTH,
    height: CARD_HEIGHT * 1.5, // Adjusted to fit all details
    overflow: "hidden",
    shadowColor: colors.neutral700,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  circle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    top: -50,
    right: -50,
  },
  circle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    bottom: -30,
    left: -30,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  passportLabel: {
    color: colors.white,
    fontFamily: typography.poppinsBold,
    fontSize: 12,
    letterSpacing: 2,
    opacity: 0.8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    opacity: 0.6,
  },
  cardContent: {
    flex: 1,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  detailsLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    fontFamily: typography.poppinsMedium,
    textTransform: "uppercase",
  },
  detailsValue: {
    fontSize: 14,
    color: colors.white,
    fontFamily: typography.poppinsSemibold,
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
});

export default PassportCard;
