import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView, MotiView } from "moti";
import { colors } from "@/theme/colors";
import HeaderTitle from "@/components/HeaderTitle";
import { useGetProfileQuery } from "@/store/api/usersApi";
import PersonalInfoCard from "./components/PersonalInfoCard";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { typography } from "@/theme/typography";

const PersonalInformationScreen: React.FC = () => {
  const { data: userData, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </View>
    );
  }

  const personalInfo = [
    { label: "First Name", value: userData?.firstName || "N/A", icon: "person-outline" },
    { label: "Last Name", value: userData?.lastName || "N/A", icon: "person-outline" },
    { label: "Email", value: userData?.email || "N/A", icon: "mail-outline" },
    { label: "Phone Number", value: userData?.phone || "N/A", icon: "call-outline" },
    { label: "Username", value: userData?.username || "N/A", icon: "at-outline" },
    { label: "Nationality", value: userData?.nationality || "N/A", icon: "flag-outline" },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderTitle title="Personal Information" />
      <View style={styles.content}>
        <PersonalInfoCard userData={userData} personalInfo={personalInfo} />

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1200 }}
          style={styles.tipBox}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary700} />
          <Text style={styles.tipText}>
            Your information is encrypted and stored securely according to our privacy policy.
          </Text>
        </MotiView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  tipBox: {
    flexDirection: "row",
    padding: 20,
    marginHorizontal: 30,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
    shadowColor: colors.neutral700,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tipText: {
    flex: 1,
    marginLeft: 15,
    color: colors.neutral600,
    fontSize: 12,
    fontFamily: typography.poppinsRegular,
    lineHeight: 18,
  },
});

export default PersonalInformationScreen;
