import { useApp } from "@/hooks/useApp";
import { SafeAreaView } from "moti";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: "Profile" | "None";
};

const ProfileScreen: React.FC<Props> = ({ label = "Profile" }): JSX.Element => {
  const { state: appState } = useApp();
  const { username } = appState?.context?.user;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{label} 🚧 🚧 🚧</Text>
      <Text style={styles.user}>Hello {username}</Text>
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
  user: {
    fontSize: 24,
    fontWeight: "700",
  },
});
