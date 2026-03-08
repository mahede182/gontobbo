// SuccessfulBookingScreen.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";

const SuccessfulBookingScreen = () => {
  const { images } = useTheme<Theme>();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={images.success} style={styles.successIcon} />
      <Text style={[styles.title, { color: colors.primary700 }]}>Booking Successful!</Text>
      <Text style={styles.message}>
        Your booking has been confirmed. You will receive a confirmation email shortly.
      </Text>
      <TouchableOpacity
        style={styles.backToHomeButton}
        onPress={() => navigation.navigate("HOME_STACK")}>
        <Text style={styles.backToHomeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: colors.neutral400,
  },
  backToHomeButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  backToHomeButtonText: {
    color: colors.white100,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SuccessfulBookingScreen;
