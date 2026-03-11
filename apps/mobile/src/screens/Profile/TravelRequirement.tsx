import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";

import React from "react";
import HeaderTitle from "@/components/HeaderTitle";
import { Box } from "@/theme";
import DocumentItem from "./components/DocumentItem";
import { TRAVEL_DOCUMENTS } from "@/constants/travel";

const TravelRequirementScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} backgroundColor="white100">
        <HeaderTitle title="Travel Requirements" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Box paddingVertical="medium">
            {TRAVEL_DOCUMENTS.map((doc, index) => (
              <DocumentItem key={doc.id} item={doc} index={index} />
            ))}
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});

export default TravelRequirementScreen;
