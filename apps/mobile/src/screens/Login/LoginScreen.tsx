/* eslint-disable no-console */
import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "@/components/Logo";
import { useTranslation } from "react-i18next";
import { Box, RestyleText } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "@/components/Dropdown";
import { languageData } from "@/data/LanguegeData";
import { RestyleTransparent } from "@/components/RestyleTransparent";
import RestyleButton from "@/components/RestyleButton";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { isIOS } from "@/utils/device";

import { handleGoogleLogin, handleAppleLogin } from "@/utils/socialAuth";
import Background from "@/components/Background";
import { googleLogin, appleLogin } from "@/api/auth";

type Props = {
  onLoginPress?: (user: string, password: string) => void;
};

const LoginScreen: React.FC<Props> = ({ onLoginPress }): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { images } = useTheme<Theme>();
  const [loading, setLoading] = useState(false);

  const onGoogleSignIn = async () => {
    try {
      setLoading(true);
      const res = await handleGoogleLogin();
      if (!res) return;
      // Support both old and new Google Sign-In SDK shapes
      const idToken = res.data?.idToken ?? res.idToken;
      if (!idToken) {
        Alert.alert("Error", "Google sign-in did not return an ID token");
        return;
      }
      await googleLogin(idToken);
      navigation.navigate("AUTHENTICATED");
    } catch (error: any) {
      Alert.alert("Login Failed", error?.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  const onAppleSignIn = async () => {
    try {
      setLoading(true);
      const res = await handleAppleLogin();
      if (!res) return;
      if (!res.identityToken) {
        Alert.alert("Error", "Apple sign-in did not return an identity token");
        return;
      }
      await appleLogin({
        identityToken: res.identityToken,
        user: res.user,
        email: res.email,
        fullName: res.fullName
          ? { givenName: res.fullName.givenName, familyName: res.fullName.familyName }
          : undefined,
      });
      navigation.navigate("AUTHENTICATED");
    } catch (error: any) {
      Alert.alert("Login Failed", error?.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <RestyleTransparent position="absolute" right={-25} opacity={0.5}>
        <Dropdown data={languageData} label={t("common.lang")} />
      </RestyleTransparent>

      <Logo />

      {/* ::: Social Login button container ::: */}
      <Box>
        {isIOS && (
          <RestyleButton
            iconSrc={images.appleIcon}
            label={t("login.continueWithApple")}
            onPress={onAppleSignIn}
            style={[styles.button, styles.appleButton]}
            disabled={loading}
          />
        )}

        <RestyleButton
          iconSrc={images.gmailIcon}
          label={t("login.continueWithGmail")}
          onPress={onGoogleSignIn}
          style={[styles.button, styles.gmailButton]}
          disabled={loading}
        />
        {/* ::: or ::: */}
        <Box style={styles.divider}>
          <Box style={styles.dividerLine} />
          <RestyleText style={styles.dividerRestyleText}>{t("common.or")}</RestyleText>
          <Box style={styles.dividerLine} />
        </Box>

        <RestyleButton
          iconSrc={images.emailIcon}
          label={t("login.loginWithEmail")}
          onPress={() => navigation.navigate("EMAIL_LOGIN")}
          style={[styles.button, styles.emailButton]}
        />
        <Box style={styles.linkContainer}>
          {/* TODO: split code and create a reusable component button */}
          <TouchableOpacity onPress={() => navigation.navigate("REGISTER")}>
            <RestyleText style={styles.linkRestyleText}>{t("login.registerWithEmail")}</RestyleText>
          </TouchableOpacity>
          {/* TODO: split code and create a reusable component button */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AUTHENTICATED");
            }}>
            <RestyleText style={styles.linkRestyleText}>{t("login.continueAsGuest")}</RestyleText>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box style={styles.footer}>
        <RestyleText style={styles.footerRestyleText}>
          {t("login.termsAndConditions")}
          <RestyleText style={styles.footerLink}> {t("login.findMore")}</RestyleText>
        </RestyleText>
      </Box>
    </Background>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  appleButton: {
    backgroundColor: colors.black,
  },
  gmailButton: {
    backgroundColor: colors.gmailBg,
  },
  emailButton: {
    backgroundColor: colors.primary700,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral500,
  },
  dividerRestyleText: {
    marginHorizontal: 5,
    color: colors.neutral500,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  linkRestyleText: {
    color: colors.primary700,
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
  },
  footer: {
    marginTop: 30,
    marginBottom: 10,
  },
  footerRestyleText: {
    fontSize: 10,
    fontFamily: typography.poppinsRegular,
    fontWeight: "300",
    color: colors.neutral600,
    textAlign: "center",
  },
  footerLink: {
    fontSize: 10,
    fontFamily: typography.poppinsRegular,
    fontWeight: "300",
    color: colors.primary700,
    textAlign: "center",
  },
});
