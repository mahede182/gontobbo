import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Dropdown from "@/components/Dropdown";
import { useTranslation } from "react-i18next";
import { languageData } from "@/data/LanguegeData";

interface Props {}

const ExploreScreens: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>ExploreScreens</Text>
      <View style={{ marginTop: 50 }}>
        <Dropdown
          label={`Current Languege: ${t("common.lang")}`}
          data={languageData}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreens;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
