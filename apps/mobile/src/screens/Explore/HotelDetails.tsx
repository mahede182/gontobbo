import React from "react";
import { Box, RestyleText } from "@/theme";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/theme/colors";
import Icon from "@expo/vector-icons/FontAwesome6";
import { useNavigation, useRoute } from "@react-navigation/native";
import { images } from "@/theme/images";
import PriceSelect from "./component/PriceSelect";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "moti";
import { typography } from "@/theme/typography";
import { dynamicCSS } from "@/utils/styles";
import { useGetHotelDetailQuery } from "@/store/api/hotelsApi";
import { useAddToWishlistMutation } from "@/store/api/wishlistApi";

const HotelDetails = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const hotelId = (route.params as any)?.hotelId;

  const { data: hotel, isLoading } = useGetHotelDetailQuery(hotelId, {
    skip: !hotelId,
  });

  const [addToWishlist] = useAddToWishlistMutation();

  const photos = hotel?.images?.slice(0, 3) ?? [];

  const renderImages = () => {
    if (photos.length === 0) return null;
    if (photos.length === 1)
      return <Image source={{ uri: photos[0] }} style={styles.singleImage} />;
    if (photos.length === 2)
      return (
        <View style={styles.twoImagesContainer}>
          <Image
            source={{ uri: photos[0] }}
            style={[styles.twoImagesLeft, dynamicCSS("marginRight", 4)]}
          />
          <Image
            source={{ uri: photos[1] }}
            style={[styles.twoImagesRight, dynamicCSS("marginRight", 4)]}
          />
        </View>
      );
    return (
      <View style={styles.threeImagesContainer}>
        <Image
          source={{ uri: photos[0] }}
          style={[styles.threeImagesLeft, dynamicCSS("marginRight", 4)]}
        />
        <View style={styles.threeImagesRightContainer}>
          <Image
            source={{ uri: photos[1] }}
            style={[styles.threeImagesRightTop, dynamicCSS("marginBottom", 4)]}
          />
          <Image
            source={{ uri: photos[2] }}
            style={[styles.threeImagesRightBottom, dynamicCSS("marginTop", 4)]}
          />
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!hotel) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <RestyleText>Hotel not found</RestyleText>
      </SafeAreaView>
    );
  }

  const params = (route.params as any) ?? {};

  const startingPrice = hotel.rooms?.[0]?.price ?? 0;
  const amenityNames = hotel.amenities?.slice(0, 3).map((a: any) => a.name) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={images.back} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              await addToWishlist({
                hotelId: hotel.id,
                type: "HOTEL",
                name: hotel.name,
                rating: hotel.rating,
              }).unwrap();
            } catch {}
          }}>
          <Image
            tintColor={colors.primary400}
            style={styles.headerFavourite}
            source={images.wishlist}
          />
        </TouchableOpacity>
      </Box>

      {photos.length > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate("HOTEL_GALLERY", { hotelId: hotel.id })}
          style={styles.imageContainer}>
          {renderImages()}
        </TouchableOpacity>
      )}

      <ScrollView style={styles.content}>
        {/* Hotel Name & Rating */}
        <Box
          borderWidth={0.6}
          borderRadius={10}
          padding={"ten"}
          borderColor={"neutral300"}
          marginVertical={"ten"}>
          <RestyleText style={styles.sectionTitle}>{hotel.name}</RestyleText>
          <RestyleText style={styles.rating}>
            {Array(Math.floor(hotel.starRating))
              .fill(null)
              .map((_: any, i: number) => (
                <Icon key={i} name="star" size={16} color={colors.linearEnd} />
              ))}
          </RestyleText>
          <RestyleText style={styles.description}>{hotel.description}</RestyleText>
        </Box>

        {/* Travel Dates & guest */}
        <Box
          borderWidth={0.6}
          borderRadius={10}
          padding={"ten"}
          borderColor={"neutral300"}
          marginVertical={"ten"}>
          <Box style={styles.section}>
            <RestyleText style={styles.sectionTitle}>
              {t("Explore.travelDatesAndGuests")}
            </RestyleText>
            <RestyleText style={styles.sectionContent}>
              {t("Explore.checkIn")}: {params.checkIn || hotel.checkInTime} |{" "}
              {t("Explore.checkOut")}: {params.checkOut || hotel.checkOutTime}
            </RestyleText>
          </Box>
        </Box>

        {/* Amenities */}
        <TouchableOpacity onPress={() => navigation.navigate("AMENITIES", { hotelId: hotel.id })}>
          <Box
            borderWidth={0.6}
            borderRadius={10}
            padding={"ten"}
            borderColor={"neutral300"}
            marginVertical={"ten"}
            style={styles.section}>
            <RestyleText style={styles.sectionTitle}>{t("Explore.amenities")}</RestyleText>
            <Box style={styles.amenitiesContainer}>
              {amenityNames.map((amenity: string, index: number) => (
                <Box key={index} style={styles.amenityContainer}>
                  <Icon key={index} name="dumbbell" size={16} color={colors.neutral600} />
                  <RestyleText style={styles.amenity}>{amenity}</RestyleText>
                </Box>
              ))}
              {hotel.amenities.length > 3 && (
                <RestyleText style={styles.moreAmenities}>
                  +{hotel.amenities.length - 3} {t("Explore.moreAmenities")}
                </RestyleText>
              )}
            </Box>
          </Box>
        </TouchableOpacity>

        {/* Review and Rating */}
        <Box
          borderWidth={0.6}
          borderRadius={10}
          padding={"ten"}
          borderColor={"neutral300"}
          marginVertical={"ten"}
          style={styles.section}>
          <RestyleText style={styles.sectionTitle}>{t("Explore.reviewsAndRating")}</RestyleText>
          {(hotel.reviews ?? []).map((review: any) => (
            <Box key={review.id} style={styles.reviewContainer}>
              <Box style={styles.reviewHeader}>
                {review.user?.avatar ? (
                  <Image source={{ uri: review.user.avatar }} style={styles.reviewAvatar} />
                ) : (
                  <Box style={styles.reviewAvatarPlaceholder} />
                )}
                <RestyleText style={styles.reviewName}>
                  {review.user?.firstName} {review.user?.lastName}
                </RestyleText>
              </Box>
              <RestyleText style={styles.reviewText}>{review.text}</RestyleText>
              {/* <Box style={styles.reviewRating}>
                {Array(review.rating)
                  .fill(null)
                  .map((_: any, i: number) => (
                    <Icon key={i} name="star" size={16} color={colors.linearEnd} />
                  ))}
              </Box> */}
            </Box>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate("REVIEW", { hotelId: hotel.id })}>
            <RestyleText>
              {t("Explore.readMore")} {hotel.reviewCount}+
            </RestyleText>
          </TouchableOpacity>
        </Box>

        {/* Location */}
        <TouchableOpacity
          onPress={() => navigation.navigate("FULL_SCREEN_MAP", { hotelId: hotel.id })}>
          <Box
            borderWidth={0.6}
            borderRadius={10}
            backgroundColor={"primary100"}
            padding={"ten"}
            borderColor={"neutral300"}
            marginVertical={"ten"}
            style={styles.section}>
            <RestyleText style={styles.sectionTitle}>{t("Explore.location")}</RestyleText>
            <Box
              style={styles.map}
              alignItems="center"
              justifyContent="center"
              backgroundColor="neutral100"
              borderRadius={10}>
              <Image
                source={
                  images.map || { uri: "https://via.placeholder.com/400x200?text=Map+Location" }
                }
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
              <Box
                position="absolute"
                backgroundColor="white"
                padding="small"
                borderRadius={4}
                style={{ opacity: 0.8 }}>
                <RestyleText style={{ fontSize: 12, color: colors.black100 }}>
                  {hotel.location}
                </RestyleText>
              </Box>
            </Box>
            <RestyleText style={styles.locationAddress}>{hotel.location}</RestyleText>
          </Box>
        </TouchableOpacity>

        <PriceSelect
          buttonText={t("Explore.selectRoom")}
          price={startingPrice}
          onPress={() => navigation.navigate("SELECT_ROOM", { hotelId: hotel.id, ...params })}
          gradient
          priceSub={`+$45 ${t("Explore.taxesAndFees", "taxes & fees")}, ${t("Explore.perNightForOneRoom", "Per Night for 1 Room")}`}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  headerFavourite: {
    height: 20,
    width: 22,
    resizeMode: "cover",
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    borderColor: colors.white200,
    borderWidth: 1,
  },
  imageContainer: {
    position: "relative",
  },
  content: {
    padding: 16,
  },
  rating: {
    flexDirection: "row",
    marginVertical: 8,
  },
  description: {
    color: colors.neutral700,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: typography.poppinsBold,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionContent: {
    color: colors.neutral700,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  amenity: {
    marginLeft: 8,
  },
  moreAmenities: {
    color: colors.neutral700,
  },
  reviewContainer: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  reviewAvatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white200,
    marginRight: 8,
  },
  reviewName: {
    fontWeight: "bold",
  },
  reviewText: {
    color: colors.neutral700,
    marginBottom: 4,
  },

  locationAddress: {
    color: colors.neutral700,
  },

  singleImage: {
    width: "100%",
    height: 300,
  },
  twoImagesContainer: {
    flexDirection: "row",
    height: 300,
  },
  twoImagesLeft: {
    width: "50%",
    height: "100%",
  },
  twoImagesRight: {
    width: "50%",
    height: "100%",
  },
  threeImagesContainer: {
    flexDirection: "row",
    height: 300,
  },
  threeImagesLeft: {
    width: "50%",
    height: "100%",
  },
  threeImagesRightContainer: {
    width: "50%",
    height: "98%",
  },
  threeImagesRightTop: {
    width: "100%",
    height: "50%",
  },
  threeImagesRightBottom: {
    width: "100%",
    height: "50%",
  },
  map: {
    width: "100%",
    height: 200,
  },
});

export default HotelDetails;
