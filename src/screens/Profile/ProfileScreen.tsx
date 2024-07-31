import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: "Profile" | "None";
};

const ProfileScreen: React.FC<Props> = ({ label = "Profile" }): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
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
