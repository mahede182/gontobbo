import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@/theme/colors";
import Icon from "@expo/vector-icons/FontAwesome";
import { Box, RestyleText } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import GradientTitle from "@/components/GradientTitle";
import { images } from "@/theme/images";
import { ScrollView } from "react-native-gesture-handler";

const ReviewsAndRatings = () => {
  const reviews = [
    {
      name: "David Moore",
      date: "Sep 20, 2024",
      review:
        "Exceptional service and luxurious rooms. The staff went above and beyond to make our stay memorable. The resort is truly a gem.",
      rating: 5,
      avatar: images.avatar1,
    },
    {
      name: "Christopher Wilson",
      date: "Jul 6, 2024",
      review:
        "Beautiful location with stunning ocean views. The rooms were clean and comfortable. Though the hotel is the restaurant was a bit pricey.",
      rating: 4,
      avatar: images.avatar2,
    },
    {
      name: "Joshua Anderson",
      date: "Jun 28, 2023",
      review:
        "A cozy and peaceful getaway in the mountains. Great hiking trails nearby. The only downside was the limited dining options.",
      rating: 5,
      avatar: images.avatar1,
    },
    {
      name: "Dis Nolan",
      date: "Jul 6, 2024",
      review:
        "Beautiful location with stunning ocean views. The rooms were clean and comfortable. Though the hotel is the restaurant was a bit pricey.",
      rating: 4,
      avatar: images.avatar2,
    },
  ];

  const navigation = useNavigation();

  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      {/* === Header === */}
      <Box flexDirection={"row"} alignItems={"center"} marginBottom={"medium"}>
        <Box
          style={{ height: 32, width: 32, marginRight: 10 }}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={32}
          borderColor={"greyLight"}
          borderWidth={1}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.black} />
          </TouchableOpacity>
        </Box>
        <GradientTitle variant="gradientTitle">Reviews & Rating</GradientTitle>
      </Box>

      <Box style={styles.ratingContainer}>
        <Box flexDirection={"row"} style={styles.ratingBackground}>
          <Icon
            name="star"
            color={colors.linearEnd}
            style={{ marginHorizontal: 5 }}
          />
          <RestyleText style={styles.ratingValue}>4.5</RestyleText>
        </Box>
        <Box>
          <RestyleText style={styles.ratingTitle}>Very Good</RestyleText>
          <RestyleText style={styles.ratingSubtitle}>
            10 User Reviews & 5.0 Rating
          </RestyleText>
        </Box>
      </Box>
      <Box style={styles.reviewsContainer}>
        <RestyleText style={styles.reviewsTitle}>Guest Reviews</RestyleText>
        {reviews.map((review, index) => (
          <Box key={index} style={styles.reviewCard}>
            <Box style={styles.reviewHeader}>
              <Image source={review.avatar} style={styles.avatar} />
              <Box>
                <RestyleText style={styles.reviewName}>
                  {review.name}
                </RestyleText>
                <RestyleText style={styles.reviewDate}>
                  {review.date}
                </RestyleText>
              </Box>
            </Box>
            <RestyleText style={styles.reviewText}>{review.review}</RestyleText>
            <Box style={styles.reviewRating}>
              {Array(review.rating)
                .fill()
                .map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={16}
                    color={colors.linearEnd}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  ratingBackground: {
    backgroundColor: colors.red600,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 16,
  },
  ratingValue: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingSubtitle: {
    color: "gray",
  },
  reviewsContainer: {
    padding: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  reviewName: {
    fontWeight: "bold",
  },
  reviewDate: {
    color: "gray",
  },
  reviewText: {
    marginBottom: 8,
  },
  reviewRating: {
    flexDirection: "row",
  },
});

export default ReviewsAndRatings;
