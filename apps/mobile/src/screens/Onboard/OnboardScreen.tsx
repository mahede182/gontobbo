import React from "react";
import { View, StyleSheet } from "react-native";
import { RestyleText } from "@/theme";

const OnboardScreen = () => {
  return (
    <View style={styles.container}>
      <RestyleText fontSize={32} fontWeight="bold">
        Onboard
      </RestyleText>
    </View>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
