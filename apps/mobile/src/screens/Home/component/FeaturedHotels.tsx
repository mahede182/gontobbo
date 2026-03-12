import React, { useCallback } from "react";
import { ActivityIndicator, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Box } from "@/theme";
import { useTranslation } from "react-i18next";
import HotelCard from "./HotelCard";
import { useGetFeaturedHotelsQuery, type Hotel } from "@/store/api/hotelsApi";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { fontSizes } from "@/theme/fontSizes";
import { spacing } from "@/theme/spacing";

const FeaturedHotels: React.FC = () => {
  const { t } = useTranslation();
  const { data: hotels = [], isLoading } = useGetFeaturedHotelsQuery();

  const renderHotelCard: ListRenderItem<Hotel> = useCallback(
    ({ item }) => (
      <HotelCard
        id={item.id}
        image={item.images?.[0] ?? ""}
        name={item.name}
        location={item.location}
        rating={item.rating}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Hotel) => item.id, []);

  return (
    <Box paddingHorizontal="medium" marginTop="ten">
      <GradientTitle style={styles.title}>{t("Home.featureHotels" as any)}</GradientTitle>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={hotels}
          renderItem={renderHotelCard}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </Box>
  );
};

export default FeaturedHotels;

const styles = StyleSheet.create({
  listContainer: {
    paddingRight: 32,
  },
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: fontSizes.lg,
    marginBottom: spacing.five,
  },
});
