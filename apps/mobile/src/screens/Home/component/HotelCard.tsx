import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, RestyleText as Text } from "@/theme";

import { MotiView } from "moti";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";

interface HotelCardProps {
  id: string;
  image: string;
  name: string;
  location: string;
  rating: number;
}

const HotelCard: React.FC<HotelCardProps> = React.memo(({ id, image, name, location, rating }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SEARCH_RESULT_DETAILS", { hotelId: id })}>
      <Box
        width={160}
        marginRight="medium"
        backgroundColor="neutral100"
        borderRadius={10}
        overflow="hidden">
        <Box position="relative">
          <Image
            source={image ? { uri: image } : require("@/assets/hotel_image_1.png")}
            style={styles.image}
          />
          <MotiView
            style={styles.likeContainer}
            from={{ scale: 1 }}
            animate={{ scale: 1.25 }}
            transition={{
              loop: true,
              repeatReverse: true,
              type: "timing",
              duration: 1000,
            }}>
            <Ionicons name="heart-outline" size={18} color="black100" />
          </MotiView>
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
    </TouchableOpacity>
  );
});
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
  likeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.white100,
    borderRadius: 50,
    padding: 5,
  },
});

export default HotelCard;
