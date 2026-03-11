import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView, MotiView } from "moti";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import LegalItemCard, { LegalDocument } from "./components/LegalItemCard";

const LegalScreen = () => {
  const [legalDocuments] = React.useState<LegalDocument[]>([
    {
      id: "1",
      type: "terms",
      title: "Terms of Service",
      description: "Terms and conditions for using our services",
      lastUpdated: "Jan 15, 2024",
    },
    {
      id: "2",
      type: "policy",
      title: "Privacy Policy",
      description: "How we collect, use, and protect your data",
      lastUpdated: "Jan 10, 2024",
    },
    {
      id: "3",
      type: "guidelines",
      title: "Booking Guidelines",
      description: "Rules and policies for flight bookings",
      lastUpdated: "Dec 20, 2023",
    },
    {
      id: "4",
      type: "policy",
      title: "Refund Policy",
      description: "Terms and conditions for refunds and cancellations",
      lastUpdated: "Dec 15, 2023",
    },
    {
      id: "5",
      type: "licenses",
      title: "Licenses & Certifications",
      description: "Our operational licenses and certifications",
      lastUpdated: "Nov 30, 2023",
    },
  ]);

  const handleDocumentPress = (documentId: string) => {
    // Handle document press - navigate to document detail screen
    console.log("Document pressed:", documentId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} backgroundColor="white100">
        <HeaderTitle title="Legal Information" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Box marginTop="medium">
            {legalDocuments.map((item, index) => (
              <LegalItemCard
                key={item.id}
                item={item}
                index={index}
                onPress={() => handleDocumentPress(item.id)}
              />
            ))}
          </Box>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 600 }}
            style={styles.footer}>
            <RestyleText variant="caption" color="neutral500" textAlign="center">
              Version 1.0.0 (Build 124)
            </RestyleText>
            <RestyleText variant="caption" color="neutral500" textAlign="center" marginTop="tiny">
              © 2026 Gontobbo. All rights reserved.
            </RestyleText>
          </MotiView>
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
  footer: {
    marginTop: 40,
    paddingBottom: 20,
  },
});

export default LegalScreen;
