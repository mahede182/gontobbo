import React from "react";
import { Image, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import Icon from "@expo/vector-icons/FontAwesome6";
import { MotiView } from "moti";

interface HotelHeaderProps {
  image?: string;
  name: string;
  starRating: number;
  location: string;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({ image, name, starRating, location }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <Icon
        key={i}
        name="star"
        size={14}
        color={i < Math.floor(starRating) ? colors.warning : colors.neutral300}
        style={styles.star}
      />
    ));

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
      style={styles.container}>
      <Box flexDirection="row" alignItems="center">
        <Image
          source={image ? { uri: image } : require("@/assets/hotel_image_1.png")}
          style={styles.hotelImage}
        />
        <Box flex={1} marginLeft="medium">
          <RestyleText style={styles.hotelName}>{name}</RestyleText>
          <Box flexDirection="row" marginVertical="small">
            {stars}
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Icon name="location-dot" size={12} color={colors.neutral500} />
            <RestyleText style={styles.hotelLocation}>{location}</RestyleText>
          </Box>
        </Box>
      </Box>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral200,
    marginBottom: 16,
  },
  hotelImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  hotelName: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 18,
    color: colors.neutral700,
  },
  star: {
    marginRight: 2,
  },
  hotelLocation: {
    fontFamily: typography.poppinsRegular,
    fontSize: 13,
    color: colors.neutral500,
    marginLeft: 4,
  },
});

export default HotelHeader;
