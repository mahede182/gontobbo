import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, RestyleText as Text } from "@/theme";

import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/store/api/wishlistApi";
import { showToast } from "@/utils/toast";

interface HotelCardProps {
  id: string;
  image: string;
  name: string;
  location: string;
  rating: number;
}

const HotelCard: React.FC<HotelCardProps> = React.memo(({ id, image, name, location, rating }) => {
  const navigation = useNavigation();
  const { data: wishlistItems } = useGetWishlistQuery();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isFavorited = React.useMemo(() => {
    return wishlistItems?.some((item) => item.hotelId === id) ?? false;
  }, [wishlistItems, id]);

  const toggleWishlist = React.useCallback(async () => {
    try {
      if (isFavorited) {
        // Find the specific wishlist item ID for this hotel
        const item = wishlistItems?.find((i) => i.hotelId === id);
        if (item) {
          await removeFromWishlist(item.id).unwrap();
        }
      } else {
        await addToWishlist({
          hotelId: id,
          type: "HOTEL",
          name,
          rating,
        }).unwrap();
      }
    } catch (error) {
      showToast({ type: "error", title: "Oops!", message: "Failed to update wishlist" });
    }
  }, [isFavorited, id, name, rating, addToWishlist, removeFromWishlist, wishlistItems]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => (navigation as any).navigate("SEARCH_RESULT_DETAILS", { hotelId: id })}>
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
          <TouchableOpacity
            style={styles.likeContainer}
            activeOpacity={0.7}
            onPress={toggleWishlist}>
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={18}
              color={isFavorited ? colors.primary400 : colors.black100}
            />
          </TouchableOpacity>
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
            <Text variant="caption" color="neutral600" marginLeft="small" numberOfLines={1}>
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
    top: 0,
    right: 0,
    backgroundColor: colors.white100,
    borderBottomLeftRadius: 18,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 10,
    paddingLeft: 12,
  },
});

export default HotelCard;
