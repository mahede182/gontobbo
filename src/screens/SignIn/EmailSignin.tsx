import React, { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import Background from "@/components/Background";
// import { useApp } from "@/hooks/useApp";
// import { NAuthenticatedMachine } from "@/machine/commonMachine";
// import { useMachine } from "@xstate/react";
import { dynamicCSS } from "@/utils/styles";

type Props = {};

const EmailSignin: React.FC<Props> = (props): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();
  // const { state: appState } = useApp();

  // const [state, send] = useMachine(NAuthenticatedMachine);

  // const user = state?.context?.userData;
  // const accessToken = state?.context?.accessToken;

  return (
    <Background>
      <Box>
        <HeaderTitle title={t("signIn.signInWithEmail")} />

        <Box style={styles.formContainer}>
          <RestyleText variant="inputTitle" style={dynamicCSS("marginBottom", 5)}>
            {t("signIn.emailAddress")}
          </RestyleText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(newText) => setEmail(newText.toLowerCase())}
            keyboardType="email-address"
            placeholder="gontobbo@gmail.co"
          />

          <RestyleText variant="inputTitle">{t("signIn.password")}</RestyleText>
          <Box style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={(newText) => setPassword(newText.toLowerCase())}
              secureTextEntry={!showPassword}
              placeholder="*****"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={images.showPassword}
                style={styles.showPasswordIcon}
                tintColor={showPassword ? colors.success : colors.neutral600}
              />
            </TouchableOpacity>
          </Box>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              props.onSignInPress(email, password);
              // send({
              //   type: "LOGIN",
              //   user: email,
              //   password,
              // });
            }}>
            <RestyleText variant="buttonLabel">{t("signIn.singIn")}</RestyleText>
          </TouchableOpacity>
        </Box>
        <Box style={styles.signUpContainer}>
          <RestyleText style={styles.signUpText}>{t("signIn.dontHaveAnAccount")}</RestyleText>
          <TouchableOpacity onPress={() => navigation.navigate("SIGN_UP")}>
            <RestyleText style={styles.signUpLink}>{t("signIn.signUp")}</RestyleText>
          </TouchableOpacity>
        </Box>
      </Box>
    </Background>
  );
};

export default EmailSignin;
const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: colors.neutral50,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 8,
    marginBottom: 24,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: colors.primary700,
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
    alignItems: "center",
  },

  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signUpText: {
    color: colors.neutral600,
  },
  signUpLink: {
    color: colors.primary700,
  },
  showPasswordIcon: {
    height: 10,
    width: 14,
    marginRight: 15,
  },
});
