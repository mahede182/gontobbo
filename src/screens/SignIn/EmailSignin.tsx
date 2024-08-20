import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";

type Props = {};

const EmailSignin: React.FC<Props> = (props): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();

  return (
    <ImageBackground source={images.backgroundTexture} style={styles.container}>
      <HeaderTitle title={t("signIn.signInWithEmail")} />

      <Box style={styles.formContainer}>
        <RestyleText variant="inputTitle" style={{ marginBottom: 5 }}>
          {t("signIn.emailAddress")}
        </RestyleText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="gontobbo@gmail.co"
        />

        <RestyleText variant="inputTitle">{t("signIn.password")}</RestyleText>
        <Box style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
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

        <TouchableOpacity style={styles.signInButton}>
          <RestyleText variant="buttonLabel">{t("signIn.singIn")}</RestyleText>
        </TouchableOpacity>
      </Box>
      <Box style={styles.signUpContainer}>
        <RestyleText style={styles.signUpText}>
          {t("signIn.dontHaveAnAccount")}
        </RestyleText>
        <TouchableOpacity onPress={() => navigation.navigate("SIGN_UP")}>
          <RestyleText style={styles.signUpLink}>
            {t("signIn.signUp")}
          </RestyleText>
        </TouchableOpacity>
      </Box>
    </ImageBackground>
  );
};

export default EmailSignin;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    marginLeft: 32,
    fontSize: 18,
    fontWeight: "600",
  },
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
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
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
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
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
