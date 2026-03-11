import React, { useState } from "react";
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import Background from "@/components/Background";
import { dynamicCSS } from "@/utils/styles";
import { useLoginMutation } from "@/store/api/authApi";

type Props = {
  onLoginPress?: (user: string, password: string) => void;
};

const EmailLogin: React.FC<Props> = ({ onLoginPress }): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();
  const [login, { isLoading: loading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    try {
      await login({ email, password }).unwrap();
    } catch (error: any) {
      Alert.alert("Login Failed", error?.data?.message ?? error?.message ?? "An error occurred");
    }
  };

  return (
    <Background>
      <Box>
        <HeaderTitle title={t("login.loginWithEmail")} />

        <Box style={styles.formContainer}>
          <RestyleText variant="inputTitle" style={dynamicCSS("marginBottom", 5)}>
            {t("login.emailAddress")}
          </RestyleText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(newText) => setEmail(newText.toLowerCase())}
            keyboardType="email-address"
            placeholder="gontobbo@gmail.co"
          />

          <RestyleText variant="inputTitle">{t("login.password")}</RestyleText>
          <Box style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={(newText) => setPassword(newText)}
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
            style={[styles.loginButton, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}>
            <RestyleText variant="buttonLabel">
              {loading ? t("common.loading") : t("login.login")}
            </RestyleText>
          </TouchableOpacity>
        </Box>
        <Box style={styles.registerContainer}>
          <RestyleText style={styles.registerText}>{t("login.dontHaveAnAccount")}</RestyleText>
          <TouchableOpacity onPress={() => (navigation as any).navigate("REGISTER")}>
            <RestyleText style={styles.registerLink}>{t("login.register")}</RestyleText>
          </TouchableOpacity>
        </Box>
      </Box>
    </Background>
  );
};

export default EmailLogin;
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
  loginButton: {
    backgroundColor: colors.primary700,
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
    alignItems: "center",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  registerText: {
    color: colors.neutral600,
  },
  registerLink: {
    color: colors.primary700,
  },
  showPasswordIcon: {
    height: 10,
    width: 14,
    marginRight: 15,
  },
});
