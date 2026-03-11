import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";
import HeaderTitle from "@/components/HeaderTitle";
import { useGetPassportQuery } from "@/store/api/usersApi";
import PassportCard from "./components/PassportCard";

const PassportDetailsScreen: React.FC = () => {
  const { data: passportData, isLoading } = useGetPassportQuery();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderTitle title="Passport Details" />
      <View style={styles.content}>
        <PassportCard passportData={passportData} formatDate={formatDate} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});

export default PassportDetailsScreen;
