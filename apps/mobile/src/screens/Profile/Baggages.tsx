import React from "react";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { ScrollView, ActivityIndicator, View, StyleSheet } from "react-native";
import { SafeAreaView } from "moti";
import { useGetBaggageQuery } from "@/store/api/usersApi";
import { colors } from "@/theme/colors";
import BaggageItemCard from "./components/BaggageItemCard";

const BaggagesScreen = () => {
  const { data: baggageItems, isLoading } = useGetBaggageQuery();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} backgroundColor="white100">
        <HeaderTitle title="Baggage Information" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Box paddingVertical="medium">
            {baggageItems && baggageItems.length > 0 ? (
              baggageItems.map((item, index) => (
                <BaggageItemCard key={item.id} item={item} index={index} />
              ))
            ) : (
              <Box flex={1} justifyContent="center" alignItems="center" marginTop="large">
                <RestyleText variant="textBase" color="neutral500">
                  No baggage information found.
                </RestyleText>
              </Box>
            )}
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

export default BaggagesScreen;
