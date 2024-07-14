import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const TravelScreens = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>TravelScreens</Text>
    </View>
  );
};

export default TravelScreens;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
