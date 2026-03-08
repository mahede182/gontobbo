// src/screens/Otp/OtpScreen.tsx
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const OtpScreen = (props: Props) => {
  const navigation = useNavigation();

  const handleResendCode = () => {
    // Implement logic to resend the OTP code
    // setOtp("");
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
        numberOfDigits={4}
        focusColor="green"
        focusStickBlinkingDuration={500}
        // eslint-disable-next-line no-console
        onTextChange={(text) => console.log(text)}
        onFilled={(text) => {
          navigation.navigate("AUTHENTICATING");
        }}
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
        {/* <RestyleText style={styles.resendButtonText}>{t("otp.resendCode")}</RestyleText> */}
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
    // Add styles for the "Resend New Code" button
  },
});
