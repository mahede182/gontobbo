import { Box, RestyleText } from "@/theme";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import GradientTitle from "@/components/GradientTitle";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";

interface ResultCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl?: string;
  searchParams?: any;
}

const ResultCard: React.FC<ResultCardProps> = ({
  id,
  name,
  location,
  price,
  imageUrl,
  searchParams,
}) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SEARCH_RESULT_DETAILS", { hotelId: id, ...searchParams })}
      style={styles.container}>
      <Image source={imageUrl ? { uri: imageUrl } : images.dummyCard} style={styles.image} />
      <Box style={styles.detailsContainer}>
        <Box style={styles.titleContainer}>
          <RestyleText style={styles.name}>{name}</RestyleText>
          <GradientTitle style={styles.price}>${price}</GradientTitle>
        </Box>
        <Box style={styles.subtitleContainer}>
          <RestyleText style={styles.location}>{location}</RestyleText>
          <GradientTitle style={styles.perNight}>Per Night</GradientTitle>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white100,
    borderRadius: 8,
    marginHorizontal: 16, // Added horizontal margin
    marginVertical: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  detailsContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: colors.neutral500,
  },
  perNight: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ResultCard;
