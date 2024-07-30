import React from "react";
import { Image, StyleSheet, FlatList } from "react-native";
import { Theme } from "@/@types/theme.type";
import { Ionicons } from "@expo/vector-icons";
import { Box, RestyleText as Text } from "@/theme";
import { images } from "@/theme/images";

interface HotelCardProps {
  image: string;
  name: string;
  location: string;
  rating: number;
}

const HotelCard: React.FC<HotelCardProps> = ({
  image,
  name,
  location,
  rating,
}) => (
  <Box width={200} marginRight="medium">
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
          {rating.toFixed(1)}
        </Text>
      </Box>
    </Box>
    <Text variant="subtitle" marginTop="small" numberOfLines={1}>
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
);

const FeaturedHotels: React.FC = () => {
  const hotels: HotelCardProps[] = [
    {
      image: images.dummyCard,
      name: "Caesars Palace",
      location: "Las Vegas, United States",
      rating: 4.5,
    },
    {
      image: images.dummyCard,
      name: "YOTEL New York",
      location: "Midtown, New York, United States",
      rating: 4.0,
    },
    {
      image: images.dummyCard,
      name: "Caesars Palace",
      location: "Las Vegas, United States",
      rating: 4.5,
    },
    {
      image: images.dummyCard,
      name: "YOTEL New York",
      location: "Midtown, New York, United States",
      rating: 4.0,
    },
    {
      image: images.dummyCard,
      name: "Caesars Palace",
      location: "Las Vegas, United States",
      rating: 4.5,
    },
    {
      image: images.dummyCard,
      name: "YOTEL New York",
      location: "Midtown, New York, United States",
      rating: 4.0,
    },
  ];

  return (
    <Box paddingHorizontal={"ten"}>
      <Text variant="h2" style={{ marginVertical: 10 }}>
        Featured Hotels
      </Text>
      <FlatList
        data={hotels}
        renderItem={({ item }) => <HotelCard {...item} />}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
});

export default FeaturedHotels;
