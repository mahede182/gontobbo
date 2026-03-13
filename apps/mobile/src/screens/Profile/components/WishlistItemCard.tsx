import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { images } from "@/theme/images";

import { WishlistItemCardProps } from "@/@types/profile.type";

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
          width={90}
          height={100}
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

        <Box flex={1} justifyContent="space-between" height={100} paddingVertical="tiny">
          <Box>
            <RestyleText
              numberOfLines={2}
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
              <RestyleText style={styles.star}> ★</RestyleText>
              <RestyleText
                variant="caption"
                color="neutral700"
                fontFamily={typography.poppinsMedium}>
                {rating.toFixed(1)}
              </RestyleText>
            </Box>
          </Box>

          <Box flexDirection="row" justifyContent="space-between" alignItems="flex-end">
            <RestyleText
              variant="subtitle"
              fontFamily={typography.poppinsSemibold}
              color="primary700">
              ${price}
            </RestyleText>

            <TouchableOpacity
              style={styles.bookButton}
              activeOpacity={0.8}
              onPress={() => onBookNow(item)}>
              <RestyleText fontFamily={typography.poppinsMedium} style={styles.bookButtonText}>
                Booking
              </RestyleText>
            </TouchableOpacity>
          </Box>
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
    color: colors.warning,
    marginRight: 2,
  },
  bookButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bookButtonText: {
    color: colors.white100,
    fontSize: 12,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    backgroundColor: colors.white100,
    borderRadius: 16,
    shadowColor: colors.black100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    zIndex: 1,
  },
  removeIcon: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  removeLine: {
    position: "absolute",
    width: 12,
    height: 1.5,
    backgroundColor: colors.neutral700,
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
