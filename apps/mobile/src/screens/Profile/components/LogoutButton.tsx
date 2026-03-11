import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { useTranslation } from "react-i18next";
import { useLogoutMutation } from "@/store/api/authApi";
import { clearTokens, getTokens } from "@/utils/storage";
import { useAuth } from "@/hooks/useAuth";

const LogoutButton: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    const tokens = await getTokens();
    try {
      await logoutMutation({ refreshToken: tokens?.refreshToken });
    } catch (error) {
      console.error("Logout mutation failed", error);
    }
    await clearTokens();
    logout();
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>{t("Profile.logout")}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
    shadowColor: colors.primary700,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LogoutButton;
