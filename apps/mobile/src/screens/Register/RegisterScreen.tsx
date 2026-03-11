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
import { useRegisterMutation } from "@/store/api/authApi";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { useKeyboardAnimation } from "@/hooks/useKeyboardAnimation";

const RegisterScreen: React.FC = (): JSX.Element => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [registerMutation, { isLoading: loading }] = useRegisterMutation();

  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();

  useKeyboardAnimation();

  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);
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

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      await registerMutation({ email, password, firstName, lastName, phone: phoneNumber }).unwrap();
    } catch (error: any) {
      Alert.alert("Sign Up Failed", error?.data?.message ?? error?.message ?? "An error occurred");
    }
  };

  return (
    <>
      <Background>
        <KeyboardAwareScrollView
          bottomOffset={40}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Box>
            <HeaderTitle title={`${t("register.register")} ${t("login.withEmail")}`} />

            <Box style={styles.formContainer as any}>
              <Box style={styles.inputGroup as any}>
                <RestyleText variant="inputTitle">{t("login.firstName")}</RestyleText>
                <TextInput
                  style={styles.input as any}
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  blurOnSubmit
                />
              </Box>

              <Box style={styles.inputGroup as any}>
                <RestyleText variant="inputTitle">{t("login.lastName")}</RestyleText>
                <TextInput
                  style={styles.input as any}
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  blurOnSubmit
                />
              </Box>

              <Box style={styles.inputGroup as any}>
                <RestyleText variant="inputTitle">{t("login.emailAddress")}</RestyleText>
                <TextInput
                  style={[
                    styles.input as any,
                    { borderColor: isValidEmail ? colors.neutral300 : colors.danger },
                  ]}
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  blurOnSubmit
                />
              </Box>

              <Box style={styles.inputGroup as any}>
                <RestyleText variant="inputTitle">{t("login.enterPassword")}</RestyleText>
                <Box
                  style={[
                    styles.passwordContainer as any,
                    {
                      borderColor: isValidPassword ? colors.neutral300 : colors.danger,
                    },
                  ]}>
                  <TextInput
                    style={styles.passwordInput as any}
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                      source={images.showPassword}
                      style={styles.showPasswordIcon as any}
                      tintColor={showPassword ? colors.success : colors.neutral600}
                    />
                  </TouchableOpacity>
                </Box>
              </Box>

              <Box style={styles.inputGroup as any}>
                <RestyleText variant="inputTitle">{t("login.confirmPassword")}</RestyleText>
                <Box style={styles.passwordContainer as any}>
                  <TextInput
                    style={styles.passwordInput as any}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Image
                      source={images.showPassword}
                      style={styles.showPasswordIcon as any}
                      tintColor={showConfirmPassword ? colors.success : colors.neutral600}
                    />
                  </TouchableOpacity>
                </Box>
              </Box>

              <Box style={styles.inputGroup as any}>
                <RestyleText variant="inputTitle">{t("login.phoneNumber")}</RestyleText>
                <TextInput
                  style={styles.input as any}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </Box>
            </Box>
          </Box>
        </KeyboardAwareScrollView>

        <KeyboardStickyView offset={{ closed: 0, opened: 40 }}>
          <Box
            backgroundColor="neutral50"
            padding="five"
            borderTopWidth={1}
            borderTopColor="neutral200">
            <TouchableOpacity
              onPress={handleRegister}
              disabled={!isButtonEnabled || loading}
              style={[
                styles.signUpButton,
                {
                  backgroundColor:
                    isButtonEnabled && !loading ? colors.primary700 : colors.white100,
                  marginBottom: 0,
                },
              ]}>
              <RestyleText
                style={[
                  styles.signUpButtonText,
                  { color: isButtonEnabled && !loading ? colors.white100 : colors.primary700 },
                ]}>
                {loading ? t("common.loading") : t("register.register")}
              </RestyleText>
            </TouchableOpacity>

            <Box style={styles.signInContainer as any} marginTop="none">
              <RestyleText style={styles.signInText as any}>{t("login.haveAnAccount")}</RestyleText>
              <TouchableOpacity onPress={() => navigation.navigate("EMAIL_LOGIN")}>
                <RestyleText variant="inputTitle" style={styles.signInLink as any}>
                  {t("login.login")}
                </RestyleText>
              </TouchableOpacity>
            </Box>
          </Box>
        </KeyboardStickyView>
      </Background>
      <KeyboardToolbar />
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 10,
  },
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
  signUpButton: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
    alignItems: "center",
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
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
