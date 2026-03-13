import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { colors } from "@/theme/colors";
import { useGetProfileQuery } from "@/store/api/usersApi";
import ProfileHeader from "./components/ProfileHeader";
import QuickActions from "./components/QuickActions";
import MenuSection from "./components/MenuSection";
import MenuItem from "./components/MenuItem";
import LogoutButton from "./components/LogoutButton";
import { images } from "@/theme/images";
import Background from "@/components/Background";

const ProfileScreen: React.FC = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { data: userData, isLoading: loading } = useGetProfileQuery();

  const handleNavigate = (screen: string) => {
    (navigation as any).navigate("PROFILE_CONTAINER", { screen });
  };

  const toggleLanguage = () => {
    const nextLng = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(nextLng);
  };

  const displayName = userData
    ? `${userData.firstName} ${userData.lastName}`.trim() || "Guest User"
    : "Guest User";
  const email = userData?.email ?? "No email";
  const provider =
    userData?.socialType === "GOOGLE"
      ? "Google"
      : userData?.socialType === "APPLE"
        ? "Apple"
        : "Email";

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ProfileHeader userData={userData} displayName={displayName} email={email} />

        <QuickActions provider={provider} onNavigate={handleNavigate} />

        <MenuSection title={t("Profile.personalDetails")} delay={700}>
          <MenuItem
            label={t("Profile.personalInfo")}
            icon={images.pInfo}
            onPress={() => handleNavigate("PERSONAL_INFO")}
            containerStyle={styles.borderBottom}
          />
          <MenuItem
            label={t("Profile.passportDetails")}
            icon={images.pDetails}
            onPress={() => handleNavigate("PASSPORT_DETAILS")}
            containerStyle={styles.borderBottom}
          />
          <MenuItem
            label={t("Profile.paymentMethods")}
            icon={images.pMethods}
            onPress={() => handleNavigate("PAIMENT_METHOD")}
            containerStyle={styles.borderBottom}
          />
          <MenuItem
            label={t("Profile.flightPreferences")}
            icon={images.pFlight}
            onPress={() => handleNavigate("FLIGHT_PREFERENCES")}
          />
        </MenuSection>

        <MenuSection title={t("Profile.general")} delay={900}>
          <MenuItem
            label={t("Profile.flightInformation")}
            icon={images.pFlight}
            onPress={() => handleNavigate("FLIGHT_INFORMATION")}
            containerStyle={styles.borderBottom}
          />
          <MenuItem
            label={t("Profile.travelRequirement")}
            icon={images.pReq}
            onPress={() => handleNavigate("TRAVEL_REQUIREMENT")}
            containerStyle={styles.borderBottom}
          />
          <MenuItem
            label={t("Profile.baggages")}
            icon={images.pBag}
            onPress={() => handleNavigate("BAGGAGES")}
            containerStyle={styles.borderBottom}
          />
          <MenuItem
            label={t("Profile.legal")}
            icon={images.pLegal}
            onPress={() => handleNavigate("LEGAL")}
            containerStyle={styles.borderBottom}
          />
          <MenuItem
            label={t("Profile.language")}
            icon={require("@/assets/bottomTab/explore.png")}
            onPress={toggleLanguage}
            value={i18n.language === "en" ? "English" : "বাংলা"}
            valueStyle={{ color: colors.primary700 }}
            showArrow={false}
          />
        </MenuSection>

        <LogoutButton />
      </ScrollView>
    </Background>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
});
