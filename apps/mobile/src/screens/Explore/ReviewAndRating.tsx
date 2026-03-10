/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@/theme/colors";
import Icon from "@expo/vector-icons/FontAwesome";
import { Box, RestyleText } from "@/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import GradientTitle from "@/components/GradientTitle";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { dynamicCSS } from "@/utils/styles";
import { getHotelReviews, HotelReview } from "@/api/hotels";

const ReviewsAndRatings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId } = (route.params as { hotelId: string }) || {};
  const [reviews, setReviews] = React.useState<HotelReview[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [averageRating, setAverageRating] = React.useState(0);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getHotelReviews(hotelId);
        setReviews(data);
        if (data.length > 0) {
          const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
          setAverageRating(Math.round(avg * 10) / 10);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    if (hotelId) fetchReviews();
    else setLoading(false);
  }, [hotelId]);

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color={colors.primary700} />
      </Box>
    );
  }

  return (
    <ScrollView style={dynamicCSS("backgroundColor", colors.white)}>
      {/* === Header === */}
      <Box flexDirection={"row"} alignItems={"center"} marginBottom={"medium"}>
        <Box
          style={{ height: 32, width: 32, marginRight: 10 }}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={32}
          borderColor={"white200"}
          borderWidth={1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.black100} />
          </TouchableOpacity>
        </Box>
        <GradientTitle variant="gradientTitle">{t("Explore.reviewsAndRating")}</GradientTitle>
      </Box>

      <Box style={styles.ratingContainer}>
        <Box flexDirection={"row"} style={styles.ratingBackground}>
          <Icon name="star" color={colors.linearEnd} style={dynamicCSS("marginHorizontal", 5)} />
          <RestyleText style={styles.ratingValue}>{averageRating || "N/A"}</RestyleText>
        </Box>
        <Box>
          <RestyleText style={styles.ratingTitle}>{t("Explore.veryGood")}</RestyleText>
          <RestyleText style={styles.ratingSubtitle}>
            {t("Explore.userReviewsAndRating")}
          </RestyleText>
        </Box>
      </Box>
      <Box style={styles.reviewsContainer}>
        <RestyleText style={styles.reviewsTitle}>{t("Explore.guestReviews")}</RestyleText>
        {reviews.map((review) => (
          <Box key={review.id} style={styles.reviewCard}>
            <Box style={styles.reviewHeader}>
              <Image
                source={
                  review.user?.avatar
                    ? { uri: review.user.avatar }
                    : require("@/assets/bottomTab/profile.png")
                }
                style={styles.avatar}
              />
              <Box>
                <RestyleText style={styles.reviewName}>
                  {review.user?.firstName} {review.user?.lastName}
                </RestyleText>
                <RestyleText style={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </RestyleText>
              </Box>
            </Box>
            <RestyleText style={styles.reviewText}>{review.text}</RestyleText>
            <Box style={styles.reviewRating}>
              {Array(review.rating)
                .fill(null)
                .map((_, i) => (
                  <Icon key={i} name="star" size={16} color={colors.linearEnd} />
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
    backgroundColor: colors.secondary50,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 16,
  },
  ratingValue: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "bold",
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingSubtitle: {
    color: colors.neutral500,
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
    backgroundColor: colors.secondary50,
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
    color: colors.neutral500,
  },
  reviewText: {
    marginBottom: 8,
  },
  reviewRating: {
    flexDirection: "row",
  },
});

export default ReviewsAndRatings;
