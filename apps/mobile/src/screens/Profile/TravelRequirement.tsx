import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";

import React from "react";
import HeaderTitle from "@/components/HeaderTitle";
import { Box } from "@/theme";
import DocumentItem, { TravelDocument } from "./components/DocumentItem";

const TravelRequirementScreen = () => {
  const [documents] = React.useState<TravelDocument[]>([
    {
      id: "1",
      type: "passport",
      name: "Passport",
      expiryDate: new Date("2025-12-31"),
      isRequired: true,
      description: "International passport with at least 6 months validity",
      status: "valid",
    },
    {
      id: "2",
      type: "visa",
      name: "Tourist Visa",
      isRequired: true,
      description: "Required for entry into destination country",
      status: "missing",
    },
    {
      id: "3",
      type: "insurance",
      name: "Travel Insurance",
      expiryDate: new Date("2023-12-31"),
      isRequired: true,
      description: "International travel health insurance",
      status: "expired",
    },
    {
      id: "4",
      type: "vaccination",
      name: "COVID-19 Vaccination",
      isRequired: false,
      description: "Not mandatory but recommended",
      status: "not_required",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} backgroundColor="white100">
        <HeaderTitle title="Travel Requirements" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Box paddingVertical="medium">
            {documents.map((doc, index) => (
              <DocumentItem key={doc.id} document={doc} index={index} />
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
