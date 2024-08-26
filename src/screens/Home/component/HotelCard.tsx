import React from "react";
import { Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, RestyleText as Text } from "@/theme";

import { HotelCardProps } from "@/data/hotelData";

const HotelCard: React.FC<HotelCardProps> = React.memo(({ image, name, location, rating }) => (
  <Box
    width={160}
    marginRight="medium"
    backgroundColor="neutral100"
    borderRadius={10}
    overflow="hidden">
    <Box position="relative">
      <Image source={image} style={styles.image} />
      <Box
        position="absolute"
        top={8}
        right={8}
        backgroundColor="white100"
        borderRadius={50}
        padding="ten">
        <Ionicons name="heart-outline" size={18} color="black100" />
      </Box>
      <Box
        position="absolute"
        bottom={8}
        left={8}
        backgroundColor="white100"
        borderRadius={12}
        paddingVertical="tiny"
        paddingHorizontal="small"
        flexDirection="row"
        alignItems="center">
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
        <Text variant="caption" color="textSecondary" marginLeft="xxs" numberOfLines={1}>
          {location}
        </Text>
      </Box>
    </Box>
  </Box>
));

HotelCard.displayName = "HotelCard";

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 120,
    borderRadius: 12,
  },
  listContainer: {
    paddingRight: 32,
  },
});

export default HotelCard;
