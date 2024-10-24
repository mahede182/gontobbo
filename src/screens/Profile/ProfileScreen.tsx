import { SafeAreaView } from "moti";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: "Profile" | "None";
};

const ProfileScreen: React.FC<Props> = ({ label = "Profile" }): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{label} 🚧 🚧 🚧</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
