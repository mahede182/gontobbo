/* eslint-disable no-console */
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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

import {
  // handleAppleSignIn,
  handleGoogleSignIn,
  handleAppleSignIn,
} from "@/utils/socialAuth";
import Background from "@/components/Background";
import { useApp } from "@/hooks/useApp";
import { saveItem } from "@/utils/storage";
import { saveUser } from "@/api/auth";

type Props = {};
// <> No one beat you
/**
 * <> no one beat you
 * @param hello
 *
 */

const SigninScreen: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { images } = useTheme<Theme>();
  const { state: appState, send } = useApp();
  const { rooms } = appState.context;

  const updateRoom = async () => {
    await saveItem("ROOM", rooms);
  };

  return (
    <Background>
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
            onPress={() => {
              handleAppleSignIn().then((res) => {
                if (res) {
                  console.log(res, "res apple login");
                  saveUser(JSON.stringify(res));
                  navigation.navigate("AUTHENTICATED");
                }
              });
            }}
            style={[styles.button, styles.appleButton]}
          />
        )}

        <RestyleButton
          iconSrc={images.gmailIcon}
          label={t("signIn.continueWithGmail")}
          onPress={() => {
            handleGoogleSignIn().then((res) => {
              if (res) {
                saveUser(JSON.stringify(res));
                navigation.navigate("AUTHENTICATED");
              }
            });
          }}
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
            <RestyleText style={styles.linkRestyleText}>{t("signIn.signUpWithEmail")}</RestyleText>
          </TouchableOpacity>
          {/* TODO: split code and create a reusable component button */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AUTHENTICATED");
            }}>
            <RestyleText style={styles.linkRestyleText}>{t("signIn.continueAsGuest")}</RestyleText>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box style={styles.footer}>
        <RestyleText style={styles.footerRestyleText}>
          {t("signIn.termsAndConditions")}
          <RestyleText style={styles.footerLink}> {t("signIn.findMore")}</RestyleText>
        </RestyleText>
      </Box>
    </Background>
  );
};

export default SigninScreen;

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
