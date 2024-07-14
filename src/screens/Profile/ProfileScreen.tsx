import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const ProfileScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
