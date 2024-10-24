import React, { useCallback } from "react";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Box } from "@/theme";
import { useTranslation } from "react-i18next";
import HotelCard from "./HotelCard";
import { featuredHotels, HotelCardProps } from "@/data/hotelData";
import GradientTitle from "@/components/GradientTitle";
import { useNavigation } from "@react-navigation/native";

const FeaturedHotels: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const renderHotelCard: ListRenderItem<HotelCardProps> = useCallback(
    ({ item }) => <HotelCard {...item} />,
    [],
  );

  const keyExtractor = useCallback((item: HotelCardProps) => item.id, []);

  return (
    <Box paddingHorizontal="medium" marginTop="ten">
      <GradientTitle variant="gradientTitle" style={{ marginBottom: 10 }}>
        {t("Home.featureHotels")}
      </GradientTitle>
      <FlatList
        data={featuredHotels}
        renderItem={renderHotelCard}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingRight: 32,
  },
});

export default FeaturedHotels;
