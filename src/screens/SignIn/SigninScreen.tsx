import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "../../components/Logo";
import Bg from "../../assets/Bg_texture.png";
import { useTranslation } from "react-i18next";
import { Box, RestyleText } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import appleIcon from "../../assets/signIn/appleIcon.png";
import facebookIcon from "../../assets/signIn/facebookIcon.png";
import gamilIcon from "../../assets/signIn/gmailIcon.png";
import emailIcon from "../../assets/signIn/emailIcon.png";
import Dropdown from "../../components/Dropdown";
import { languageData } from "../../data/LanguegeData";
import { RestyleTransparent } from "../../components/RestyleTransparent";
import RestyleButton from "../../components/RestyleButton";

type Props = {};

const SigninScreen = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <ImageBackground source={Bg} style={styles.container}>
      <Box position="absolute" right={0}>
        <RestyleTransparent opacity={0.25}>
          <Dropdown data={languageData} label={t("common.lang")} />
        </RestyleTransparent>
      </Box>
      <Logo />

      <Box style={styles.buttonContainer}>
        {/* ::: SignIn with Apple Button ::: */}
        <RestyleButton
          iconSrc={appleIcon}
          label={t("signIn.continueWithApple")}
          onPress={() => alert(t("signIn.continueWithApple"))}
          style={[styles.button, styles.appleButton]}
        />
        {/* ::: SignIn with Apple facebook Button ::: */}
        <RestyleButton
          iconSrc={facebookIcon}
          label={t("signIn.continueWithFacebook")}
          onPress={() => alert(t("signIn.continueWithFacebook"))}
          style={[styles.button, styles.facebookButton]}
        />
        {/* ::: SignIn with Apple Gmail Button ::: */}
        <RestyleButton
          iconSrc={gamilIcon}
          label={t("signIn.continueWithGmail")}
          onPress={() => alert(t("signIn.continueWithGmail"))}
          style={[styles.button, styles.gmailButton]}
        />
        <Box style={styles.divider}>
          <Box style={styles.dividerLine} />
          <RestyleText style={styles.dividerRestyleText}>
            {t("common.or")}
          </RestyleText>
          <Box style={styles.dividerLine} />
        </Box>
        {/* Sign in with Email Button */}
        <RestyleButton
          iconSrc={emailIcon}
          label={t("signIn.signInWithEmail")}
          onPress={() => alert(t("signIn.continueWithGmail"))}
          style={[styles.button, styles.emailButton]}
        />
        <Box style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SIGN_UP")}>
            <RestyleText style={styles.linkRestyleText}>
              {t("signIn.signUpWithEmail")}
            </RestyleText>
          </TouchableOpacity>
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
          <RestyleText style={styles.footerLink}>
            {" "}
            {t("signIn.findMore")}
          </RestyleText>
        </RestyleText>
      </Box>
    </ImageBackground>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonRestyleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  appleButton: {
    backgroundColor: "#000000",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
  },
  gmailButton: {
    backgroundColor: "#EA4335",
  },
  emailButton: {
    backgroundColor: "#4285F4",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerRestyleText: {
    marginHorizontal: 10,
    color: "#666",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  linkRestyleText: {
    color: "#4285F4",
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
  },
  footerRestyleText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  footerLink: {
    color: "#4285F4",
  },
});
