// src/screens/Otp/OtpScreen.tsx
import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation, useRoute } from "@react-navigation/native";
import { verifyOtp, sendOtp } from "@/api/auth";

type Props = {};

const OtpScreen = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = (route.params as any)?.email ?? "";
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (otp: string) => {
    try {
      setLoading(true);
      await verifyOtp(email, otp);
      navigation.navigate("AUTHENTICATED");
    } catch (error: any) {
      Alert.alert("Verification Failed", error?.response?.data?.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return;
    try {
      await sendOtp(email);
      Alert.alert("Success", "OTP has been resent to your email");
    } catch (error: any) {
      Alert.alert("Error", error?.response?.data?.message ?? error.message);
    }
  };

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={colors.background}
      marginHorizontal={"forty"}>
      <RestyleText style={styles.title}></RestyleText>
      <OtpInput
        numberOfDigits={6}
        focusColor="green"
        focusStickBlinkingDuration={500}
        disabled={loading}
        onFilled={handleVerifyOtp}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: styles.container,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
        }}
      />
      <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
        <RestyleText style={styles.resendButtonText}>Resend Code</RestyleText>
      </TouchableOpacity>
    </Box>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    ...typography.header1,
    marginBottom: 16,
  },
  resendButton: {
    marginTop: 20,
  },
  resendButtonText: {
    color: colors.primary700,
    fontSize: 14,
  },
});
