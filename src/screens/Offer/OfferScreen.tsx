import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OfferScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>OfferScreen</Text>
    </View>
  );
};

export default OfferScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
