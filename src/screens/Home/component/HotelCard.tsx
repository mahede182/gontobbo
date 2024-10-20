import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, RestyleText as Text } from "@/theme";

import { HotelCardProps } from "@/data/hotelData";
import { Skeleton } from "moti/skeleton";
import { useDummyLoading } from "@/hooks/useDummyLoading";
import { MotiView } from "moti";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";

const HotelCard: React.FC<HotelCardProps> = React.memo(({ image, name, location, rating }) => {
  const { isLoading } = useDummyLoading(true, 5000);
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SEARCH_RESULT_DETAILS")}>
      <Box
        width={160}
        marginRight="medium"
        backgroundColor="neutral100"
        borderRadius={10}
        overflow="hidden">
        <Box position="relative">
          <Skeleton show={isLoading} colorMode="light" radius="square" height={150} width={"100%"}>
            <Image source={image} style={styles.image} />
          </Skeleton>
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
    padding: 10,
  },
});

export default HotelCard;
