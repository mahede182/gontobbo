import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { PersonalInfoCardProps } from "@/@types/profile.type";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ userData, personalInfo }) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.5, rotateY: "45deg" }}
      animate={{ opacity: 1, scale: 1, rotateY: "0deg" }}
      transition={{ type: "timing", duration: 800, delay: 200 }}
      style={styles.cardContainer}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              userData?.avatar
                ? { uri: userData.avatar }
                : require("@/assets/bottomTab/profile.png")
            }
            style={styles.avatar}
          />
        </View>
        <View style={[styles.classBadge, { backgroundColor: "rgba(255,255,255,0.1)" }]}>
          <Text style={styles.classText}>PROFILE INFO</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        {personalInfo.map((item, index) => (
          <MotiView
            key={item.label}
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 500 + index * 100 }}
            style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon as any} size={16} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {item.value}
              </Text>
            </View>
          </MotiView>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <Image
          source={require("@/assets/profile/info.png")}
          style={styles.footerLogo}
          fadeDuration={0}
        />
        <Text style={styles.lastUpdated}>Gontobbo Verified Profile</Text>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.primary700,
    borderRadius: 25,
    padding: 24,
    overflow: "hidden",
    shadowColor: colors.primary700,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  circle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    top: -100,
    right: -100,
  },
  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    bottom: -80,
    left: -80,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
  },
  classBadge: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  classText: {
    color: colors.white,
    fontFamily: typography.poppinsBold,
    fontSize: 10,
    letterSpacing: 1.5,
  },
  cardContent: {
    flex: 1,
    gap: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  infoLabel: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 10,
    fontFamily: typography.poppinsMedium,
    textTransform: "uppercase",
  },
  infoValue: {
    color: colors.white,
    fontSize: 15,
    fontFamily: typography.poppinsSemibold,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerLogo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "rgba(255,255,255,0.8)",
  },
  lastUpdated: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontFamily: typography.poppinsRegular,
  },
});

export default PersonalInfoCard;
