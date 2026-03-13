import { Box, RestyleText } from "@/theme";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import Icon from "@expo/vector-icons/MaterialIcons";
import { typography } from "@/theme/typography";

interface ResultCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  searchParams?: any;
}

const ResultCard: React.FC<ResultCardProps> = ({
  id,
  name,
  location,
  price,
  rating = 4.5, // Default for demo if not provided
  reviewCount = 120,
  imageUrl,
  searchParams,
}) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("SEARCH_RESULT_DETAILS", { hotelId: id, ...searchParams })}
      style={styles.container}>
      {/* Image Section with Rating Badge */}
      <Box style={styles.imageContainer}>
        <Image
          source={imageUrl ? { uri: imageUrl } : images.dummyCard}
          style={styles.image}
          resizeMode="cover"
        />
        <Box style={styles.ratingBadge}>
          <Icon name="star" size={14} color="#FFB800" />
          <RestyleText style={styles.ratingText}>{rating}</RestyleText>
        </Box>

        {/* Wishlist button placeholder */}
        <TouchableOpacity style={styles.wishlistBtn}>
          <Icon name="favorite-border" size={20} color={colors.white} />
        </TouchableOpacity>
      </Box>

      {/* Content Section */}
      <Box style={styles.detailsContainer}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <RestyleText style={styles.name} numberOfLines={1}>
              {name}
            </RestyleText>
            <Box flexDirection="row" alignItems="center" marginTop="small">
              <Icon name="location-on" size={14} color={colors.neutral500} />
              <RestyleText style={styles.location} numberOfLines={1}>
                {location}
              </RestyleText>
            </Box>
          </Box>

          <Box alignItems="flex-end">
            <RestyleText style={styles.price}>${price}</RestyleText>
            <RestyleText style={styles.perNight}>per night</RestyleText>
          </Box>
        </Box>

        <Box style={styles.divider} />

        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <RestyleText style={styles.reviewsText}>{reviewCount} reviews</RestyleText>
          <Box flexDirection="row" alignItems="center">
            <RestyleText style={styles.detailsBtnText}>View Details</RestyleText>
            <Icon name="chevron-right" size={18} color={colors.primary700} />
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    color: colors.white,
    fontFamily: typography.poppinsBold,
    fontSize: 12,
  },
  wishlistBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 18,
    color: colors.black100,
  },
  location: {
    fontFamily: typography.poppinsRegular,
    fontSize: 13,
    color: colors.neutral500,
    marginLeft: 2,
  },
  price: {
    fontFamily: typography.poppinsBold,
    fontSize: 20,
    color: colors.primary700,
  },
  perNight: {
    fontFamily: typography.poppinsRegular,
    fontSize: 11,
    color: colors.neutral500,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral100,
    marginVertical: 12,
  },
  reviewsText: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.neutral500,
  },
  detailsBtnText: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 13,
    color: colors.primary700,
  },
});

export default ResultCard;
