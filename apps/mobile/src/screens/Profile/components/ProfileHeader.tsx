import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { MotiView, MotiText } from "moti";
import { colors } from "@/theme/colors";
import { ProfileHeaderProps } from "@/@types/profile.type";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData, displayName, email }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 800 }}
      style={styles.curvedBackground}>
      <View style={styles.profileContainer}>
        <View style={styles.imgBorder}>
          <Image
            style={styles.profileImage}
            source={
              userData?.avatar
                ? { uri: userData.avatar }
                : require("@/assets/bottomTab/profile.png")
            }
          />
        </View>
        <MotiText
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 300 }}
          style={styles.name}>
          {displayName}
        </MotiText>
        <Text style={styles.membershipLevel}>{email}</Text>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  curvedBackground: {
    backgroundColor: colors.primary700,
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: colors.primary700,
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blue100,
    padding: 12,
  },
  imgBorder: {
    borderColor: colors.neutral400,
    borderWidth: 2,
    padding: 5,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.white,
  },
  membershipLevel: {
    fontSize: 16,
    color: colors.white200,
  },
});

export default ProfileHeader;
