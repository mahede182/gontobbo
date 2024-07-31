import React, { useCallback } from "react";
import { Image, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, RestyleText as Text } from "@/theme";
import { useTranslation } from "react-i18next";
import { HotelCardProps, featuredHotels } from "@/data/hotelData";

const HotelCard: React.FC<HotelCardProps> = React.memo(
  ({ image, name, location, rating }) => (
    <Box
      width={160} // Adjust width to match design
      marginRight="medium"
      backgroundColor="greyLight2"
      borderRadius={10}
      overflow="hidden"
    >
      <Box position="relative">
        <Image source={image} style={styles.image} />
        <Box
          position="absolute"
          top={8}
          right={8}
          backgroundColor="white"
          borderRadius={50}
          padding="ten"
        >
          <Ionicons name="heart-outline" size={18} color="black" />
        </Box>
        <Box
          position="absolute"
          bottom={8}
          left={8}
          backgroundColor="white"
          borderRadius={12}
          paddingVertical="tiny"
          paddingHorizontal="small"
          flexDirection="row"
          alignItems="center"
        >
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text variant="caption" marginLeft="small">
            {rating?.toFixed(1)}
          </Text>
        </Box>
      </Box>
      <Box padding="small">
        <Text variant="subtitle" numberOfLines={1}>
          {name}
        </Text>
        <Box flexDirection="row" alignItems="center" marginTop="tiny">
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text
            variant="caption"
            color="textSecondary"
            marginLeft="xxs"
            numberOfLines={1}
          >
            {location}
          </Text>
        </Box>
      </Box>
    </Box>
  )
);

HotelCard.displayName = "HotelCard";

const FeaturedHotels: React.FC = () => {
  const { t } = useTranslation();

  const renderHotelCard: ListRenderItem<HotelCardProps> = useCallback(
    ({ item }) => <HotelCard {...item} />,
    []
  );

  const keyExtractor = useCallback((item: HotelCardProps) => item.id, []);

  return (
    <Box paddingHorizontal="medium" marginTop="ten">
      <Text variant="h2" style={{ marginBottom: 10 }}>
        {t("Home.featureHotels")}
      </Text>
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
  image: {
    width: 160, // Adjust width to match design
    height: 120, // Adjust height to match design
    borderRadius: 12,
  },
  listContainer: {
    paddingRight: 32, // Add extra padding to the right for better scrolling
  },
});

export default HotelCard;
