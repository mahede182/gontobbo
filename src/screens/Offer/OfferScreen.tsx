import { SafeAreaView } from "moti";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OfferScreen: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Offer Screen 🚧 🚧 🚧</Text>
    </SafeAreaView>
  );
};

export default OfferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
