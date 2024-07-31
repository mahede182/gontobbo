import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const Heart: React.FC<Props> = (props): JSX.Element => {
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
