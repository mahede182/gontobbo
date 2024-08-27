/* eslint-disable no-console */
import React from "react";
import { Alert, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
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
import * as AppleAuthentication from "expo-apple-authentication";
import { isIOS } from "@/utils/device";

import {
  // handleAppleSignIn,
  handleFacebookSignIn,
  handleGoogleSignIn,
} from "@/utils/socialAuth";

type Props = {};
// <> No one beat you
/**
 * <> no one beat you
 * @param hello
 *
 */
// FIXME: apple pay auth not work. split the code @/utils/socialAuth
const handleAppleSignIn = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    // DEBUG: watch out the token
    // Handle the signed-in user's information
    console.log("Apple Sign-In Successful:", credential);
    // You can access the user's information from the `credential` object
    // For example: credential.user, credential.email, credential.fullName, etc.
  } catch (error) {
    console.log(error);
    if (error.code === "ERR_REQUEST_CANCELED") {
      // User canceled the sign-in flow
      console.log("Apple Sign-In Canceled");
    } else {
      // Handle other errors
      console.error("Apple Sign-In Error:", error);
      Alert.alert("Error", error.message);
    }
  }
};

const SigninScreen: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { images } = useTheme<Theme>();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground source={images.backgroundTexture} style={styles.container}>
        <RestyleTransparent position="absolute" right={-25} opacity={0.5}>
          <Dropdown data={languageData} label={t("common.lang")} />
        </RestyleTransparent>

        <Logo />

        {/* ::: Social Sign in button container ::: */}
        <Box>
          {isIOS && (
            <RestyleButton
              iconSrc={images.appleIcon}
              label={t("signIn.continueWithApple")}
              onPress={handleAppleSignIn}
              style={[styles.button, styles.appleButton]}
            />
          )}

          <RestyleButton
            iconSrc={images.fbIcon}
            label={t("signIn.continueWithFacebook")}
            onPress={handleFacebookSignIn}
            style={[styles.button, styles.facebookButton]}
          />
          <RestyleButton
            iconSrc={images.gmailIcon}
            label={t("signIn.continueWithGmail")}
            onPress={handleGoogleSignIn}
            style={[styles.button, styles.gmailButton]}
          />
          {/* ::: or ::: */}
          <Box style={styles.divider}>
            <Box style={styles.dividerLine} />
            <RestyleText style={styles.dividerRestyleText}>{t("common.or")}</RestyleText>
            <Box style={styles.dividerLine} />
          </Box>

          <RestyleButton
            iconSrc={images.emailIcon}
            label={t("signIn.signInWithEmail")}
            onPress={() => navigation.navigate("EMAIL_SIGN_IN")}
            style={[styles.button, styles.emailButton]}
          />
          <Box style={styles.linkContainer}>
            {/* TODO: split code and create a reusable component button */}
            <TouchableOpacity onPress={() => navigation.navigate("SIGN_UP")}>
              <RestyleText style={styles.linkRestyleText}>
                {t("signIn.signUpWithEmail")}
              </RestyleText>
            </TouchableOpacity>
            {/* TODO: split code and create a reusable component button */}
            <TouchableOpacity onPress={() => navigation.navigate("HOME")}>
              <RestyleText style={styles.linkRestyleText}>
                {t("signIn.continueAsGuest")}
              </RestyleText>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box style={styles.footer}>
          <RestyleText style={styles.footerRestyleText}>
            {t("signIn.termsAndConditions")}
            <RestyleText style={styles.footerLink}> {t("signIn.findMore")}</RestyleText>
          </RestyleText>
        </Box>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.neutral100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
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
  facebookButton: {
    backgroundColor: colors.fbBg,
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
