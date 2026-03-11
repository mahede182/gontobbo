import React from "react";
import { StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { MotiView } from "moti";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { images } from "@/theme/images";
import { WishlistItem } from "@/store/api/wishlistApi";

interface WishlistItemCardProps {
  item: WishlistItem;
  index: number;
  onRemove: (id: string) => void;
  onBookNow: (item: WishlistItem) => void;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
  item,
  index,
  onRemove,
  onBookNow,
}) => {
  const imageUrl = item.hotel?.images?.[0];
  const name = item.hotel?.name ?? item.name;
  const rating = item.hotel?.rating ?? item.rating ?? 0;
  const price = (item.hotel as any)?.startingPrice ?? Math.floor(Math.random() * 500) + 200;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}>
      <Box
        flexDirection="row"
        alignItems="center"
        padding="medium"
        marginVertical="tiny"
        backgroundColor="white"
        borderRadius={16}
        shadowColor="neutral700"
        shadowOpacity={0.05}
        shadowOffset={{ width: 0, height: 2 }}
        shadowRadius={10}
        elevation={3}
        borderWidth={1}
        borderColor="neutral100">
        <Box
          width={80}
          height={80}
          backgroundColor="neutral100"
          borderRadius={12}
          overflow="hidden"
          marginRight="medium">
          <Image
            source={imageUrl ? { uri: imageUrl } : images.dummyCard}
            style={styles.image}
            resizeMode="cover"
          />
        </Box>

        <Box flex={1}>
          <RestyleText
            numberOfLines={1}
            variant="searchHotelTitle"
            fontFamily={typography.poppinsSemibold}
            color="neutral700">
            {name}
          </RestyleText>

          <Box flexDirection="row" alignItems="center" marginVertical="tiny">
            <RestyleText
              variant="caption"
              color="neutral600"
              fontFamily={typography.poppinsRegular}>
              Review
            </RestyleText>
            <RestyleText style={styles.star}>★</RestyleText>
            <RestyleText variant="caption" color="neutral600" fontFamily={typography.poppinsMedium}>
              {rating.toFixed(1)}
            </RestyleText>
          </Box>

          <RestyleText
            variant="subtitle"
            fontFamily={typography.poppinsSemibold}
            color="neutral700">
            ${price}
          </RestyleText>

          <TouchableOpacity style={styles.addToBagButton} onPress={() => onBookNow(item)}>
            <RestyleText
              // color="white"
              fontFamily={typography.poppinsMedium}
              style={styles.addToBagText}>
              Add to Bag
            </RestyleText>
          </TouchableOpacity>
        </Box>

        <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(item.id)}>
          <Box style={styles.removeIcon}>
            <Box style={[styles.removeLine, styles.removeLine1]} />
            <Box style={[styles.removeLine, styles.removeLine2]} />
          </Box>
        </TouchableOpacity>
      </Box>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  star: {
    fontSize: 12,
    color: colors.black,
    marginHorizontal: 4,
  },
  addToBagButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  addToBagText: {
    color: colors.white100,
    fontSize: 11,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  removeIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  removeLine: {
    position: "absolute",
    width: 14,
    height: 2,
    backgroundColor: colors.neutral400,
    borderRadius: 1,
  },
  removeLine1: {
    transform: [{ rotate: "45deg" }],
  },
  removeLine2: {
    transform: [{ rotate: "-45deg" }],
  },
});

export default WishlistItemCard;
