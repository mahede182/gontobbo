import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Box } from "@/theme";
import { useTranslation } from "react-i18next";
import HotelCard from "./HotelCard";
import { getFeaturedHotels, Hotel } from "@/api/hotels";
import GradientTitle from "@/components/GradientTitle";
import { dynamicCSS } from "@/utils/styles";

const FeaturedHotels: React.FC = () => {
  const { t } = useTranslation();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedHotels()
      .then(setHotels)
      .finally(() => setLoading(false));
  }, []);

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
      <GradientTitle variant="gradientTitle" style={dynamicCSS("marginBottom", 10)}>
        {t("Home.featureHotels")}
      </GradientTitle>
      {loading ? (
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

const styles = StyleSheet.create({
  listContainer: {
    paddingRight: 32,
  },
});

export default FeaturedHotels;
