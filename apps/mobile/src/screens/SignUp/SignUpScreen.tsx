/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@/components/HeaderTitle";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { validateEmail, validatePassword } from "@/utils/helper";
import Background from "@/components/Background";
import { View } from "moti";
import { register } from "@/api/auth";

type Props = {};

const SignUpScreen: React.FC<Props> = (props): JSX.Element => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();

  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);
  // Function to check if all input fields are filled
  const areAllFieldsFilled = () => {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      isValidEmail &&
      isValidPassword &&
      confirmPassword.length > 0 &&
      phoneNumber.length > 0
    );
  };
  // Update the button enabled state whenever the input fields change
  React.useEffect(() => {
    setIsButtonEnabled(areAllFieldsFilled());
  }, [firstName, lastName, email, password, confirmPassword, phoneNumber]);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await register(email, password, firstName, lastName);
      navigation.navigate("OTP", { email });
    } catch (error: any) {
      Alert.alert("Sign Up Failed", error?.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View>
        <HeaderTitle
          title={`${t("signIn.sign")} ${t("signIn.up")} ${t("signIn.withEmail")}`}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <Box style={styles.formContainer}>
          <Box style={styles.inputGroup}>
            <RestyleText variant="inputTitle">{t("signIn.firstName")}</RestyleText>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              blurOnSubmit
            />
          </Box>

          <Box style={styles.inputGroup}>
            <RestyleText variant="inputTitle">{t("signIn.lastName")}</RestyleText>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              blurOnSubmit
            />
          </Box>

          <Box style={styles.inputGroup}>
            <RestyleText variant="inputTitle">{t("signIn.emailAddress")}</RestyleText>
            <TextInput
              style={[
                styles.input,
                { borderColor: isValidEmail ? colors.neutral300 : colors.danger },
              ]}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              blurOnSubmit
            />
          </Box>

          <Box style={styles.inputGroup}>
            <RestyleText variant="inputTitle">{t("signIn.enterPassword")}</RestyleText>
            <Box
              style={[
                styles.passwordContainer,
                {
                  borderColor: isValidPassword ? colors.neutral300 : colors.danger,
                },
              ]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={images.showPassword}
                  style={styles.showPasswordIcon}
                  tintColor={showPassword ? colors.success : colors.neutral600}
                />
              </TouchableOpacity>
            </Box>
          </Box>

          <Box style={styles.inputGroup}>
            <RestyleText variant="inputTitle">{t("signIn.confirmPassword")}</RestyleText>
            <Box style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Image
                  source={images.showPassword}
                  style={styles.showPasswordIcon}
                  tintColor={showConfirmPassword ? colors.success : colors.neutral600}
                />
              </TouchableOpacity>
            </Box>
          </Box>

          <Box style={styles.inputGroup}>
            <RestyleText variant="inputTitle">{t("signIn.phoneNumber")}</RestyleText>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </Box>

          <TouchableOpacity
            onPress={handleSignUp}
            disabled={!isButtonEnabled || loading}
            style={styles.signUpButton(isButtonEnabled && !loading)}>
            <RestyleText style={styles.signUpButtonText(isButtonEnabled && !loading)}>
              {loading ? t("common.loading") : t("signIn.signUp")}
            </RestyleText>
          </TouchableOpacity>
        </Box>

        <Box style={styles.signInContainer}>
          <RestyleText style={styles.signInText}>{t("signIn.haveAnAccount")}</RestyleText>
          <TouchableOpacity onPress={() => navigation.navigate("EMAIL_SIGN_IN")}>
            <RestyleText variant="inputTitle" style={styles.signInLink}>
              {t("signIn.singIn")}
            </RestyleText>
          </TouchableOpacity>
        </Box>
      </View>
    </Background>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: colors.neutral50,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 5,
  },
  inputGroup: {
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  signUpButton: (isButtonEnabled) => ({
    backgroundColor: isButtonEnabled ? colors.primary700 : colors.white100,
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
    alignItems: "center",
  }),
  signUpButtonText: (isButtonEnabled) => ({
    color: isButtonEnabled ? colors.white100 : colors.primary700,
    fontSize: 18,
    fontWeight: "600",
  }),
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signInText: {
    color: colors.neutral600,
  },
  signInLink: {
    color: colors.primary700,
  },
  showPasswordIcon: {
    height: 10,
    width: 14,
    marginRight: 15,
  },
});
