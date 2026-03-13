import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView, MotiView } from "moti";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import LegalItemCard from "./components/LegalItemCard";
import { LEGAL_DOCUMENTS } from "@/constants/legal";

const LegalScreen = () => {
  const handleDocumentPress = (documentId: string) => {
    // TODO: Navigate to document detail screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} backgroundColor="white100">
        <HeaderTitle title="Legal Information" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Box marginTop="medium">
            {LEGAL_DOCUMENTS.map((item, index) => (
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
