import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const Heart = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Heart</Text>
    </View>
  );
};

export default Heart;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
