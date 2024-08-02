import { Box, RestyleText } from "@/theme";
import React from "react";
import { Image, StyleSheet } from "react-native";
import GradientTitle from "@/components/GradientTitle";

interface ResultCardProps {
  name: string;
  location: string;
  price: number;
  imageSource: any;
}

const ResultCard: React.FC<ResultCardProps> = ({
  name,
  location,
  price,
  imageSource,
}) => {
  return (
    <Box style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Box style={styles.detailsContainer}>
        <Box style={styles.titleContainer}>
          <RestyleText style={styles.name}>{name}</RestyleText>
          <GradientTitle style={styles.price}>${price}</GradientTitle>
        </Box>
        <Box style={styles.subtitleContainer}>
          <RestyleText style={styles.location}>{location}</RestyleText>
          <GradientTitle style={styles.perNight}>
            Per Night for 2 Rooms
          </GradientTitle>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
    color: "gray600",
  },
  perNight: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ResultCard;
