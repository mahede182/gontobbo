import React from "react";
import { Box, RestyleText } from "@/theme";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@/theme/colors";
import Icon from "@expo/vector-icons/FontAwesome6";
import detailsImage from "@/assets/hotel_image_1.png";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { images } from "@/theme/images";
import PriceSelect from "./component/PriceSelect";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "moti";

const HotelDetails = () => {
  const { t } = useTranslation();
  const name = "Caesars Palace";
  const rating = 4;
  const description =
    "Conveniently situated in the Washington Heights district of New York, Hotel Moca NYC is located 2.8 km from Yankee Stadium, 5 km from Columbia University and 6.3 km from Bronx Zoo.";
  const checkInDate = "12:00 PM";
  const checkOutDate = "12:00 PM";
  const guests = "1 Room / 2 Guests";
  const amenities = ["Gym", "Laundry", "Free Wi-Fi"];
  const photos = [detailsImage, detailsImage, detailsImage];
  const reviews: Review[] = [
    {
      name: "Donald Moore",
      review: "Great hotel with a nice location. The staff was very friendly and helpful.",
      rating: 4,
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      name: "Christopher Wilson",
      review:
        "Beautiful and clean hotel with amazing views. The rooms were spacious and comfortable.",
      rating: 4,
      avatar: "https://example.com/avatar2.jpg",
    },
    {
      name: "Joshua Anderson",
      review:
        "A great hotel with a great location. The hotel lobby is beautiful. Highly recommended.",
      rating: 5,
      avatar: "https://example.com/avatar3.jpg",
    },
  ];
  const location = {
    latitude: 40.7829,
    longitude: -73.9654,
    address: "3570 Las Vegas Blvd S, Las Vegas, NV 89109",
  };

  const renderImages = () => {
    switch (photos.length) {
      case 1:
        return <Image source={photos[0]} style={styles.singleImage} />;
      case 2:
        return (
          <View style={styles.twoImagesContainer}>
            <Image source={photos[0]} style={[styles.twoImagesLeft, { marginRight: 4 }]} />
            <Image source={photos[1]} style={[styles.twoImagesRight, { marginLeft: 4 }]} />
          </View>
        );
      case 3:
        return (
          <View style={styles.threeImagesContainer}>
            <Image source={photos[0]} style={[styles.threeImagesLeft, { marginRight: 4 }]} />
            <View style={styles.threeImagesRightContainer}>
              <Image source={photos[1]} style={[styles.threeImagesRightTop, { marginBottom: 4 }]} />
              <Image source={photos[2]} style={[styles.threeImagesRightBottom, { marginTop: 4 }]} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={images.back} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("favourite added")}>
          <Image style={styles.headerFavourite} source={images.wishlist} />
        </TouchableOpacity>
      </Box>

      {true ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("HOTEL_GALLERY")}
          style={styles.imageContainer}>
          {renderImages()}
        </TouchableOpacity>
      ) : null}

      <ScrollView style={styles.content}>
        {/* === Ceasurs Palace === */}
        <Box
          borderWidth={0.6}
          borderRadius={10}
          padding={"ten"}
          borderColor={"neutral300"}
          marginVertical={"ten"}>
          <RestyleText style={styles.name}>{name}</RestyleText>
          <RestyleText style={styles.rating}>
            {Array(Math.floor(rating))
              .fill()
              .map((_, i) => (
                <Icon key={i} name="star" size={16} color={colors.linearEnd} />
              ))}
          </RestyleText>
          <RestyleText style={styles.description}>{description}</RestyleText>
        </Box>
        {/* === Travel Dates & guest === */}
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
              {t("Explore.checkIn")}: {checkInDate} | {t("Explore.checkOut")}: {checkOutDate} |{" "}
              {guests}
            </RestyleText>
          </Box>
        </Box>
        {/* === Amenities === */}
        <TouchableOpacity onPress={() => navigation.navigate("AMENITIES")}>
          <Box
            borderWidth={0.6}
            borderRadius={10}
            padding={"ten"}
            borderColor={"neutral300"}
            marginVertical={"ten"}
            style={styles.section}>
            <RestyleText style={styles.sectionTitle}>{t("Explore.amenities")}</RestyleText>
            <Box style={styles.amenitiesContainer}>
              {amenities.map((amenity, index) => (
                <Box key={index} style={styles.amenityContainer}>
                  <Icon name="dumbbell" size={16} color={colors.green} />
                  <RestyleText style={styles.amenity}>{amenity}</RestyleText>
                </Box>
              ))}
              {amenities.length > 3 && (
                <RestyleText style={styles.moreAmenities}>
                  +{amenities.length - 3} {t("Explore.moreAmenities")}
                </RestyleText>
              )}
            </Box>
          </Box>
        </TouchableOpacity>

        {/* === Review and Rating === */}
        <Box
          borderWidth={0.6}
          borderRadius={10}
          padding={"ten"}
          borderColor={"neutral300"}
          marginVertical={"ten"}
          style={styles.section}>
          <RestyleText style={styles.sectionTitle}>{t("Explore.reviewsAndRating")}</RestyleText>
          {reviews.map((review, index) => (
            <Box key={index} style={styles.reviewContainer}>
              <Box style={styles.reviewHeader}>
                {review.avatar ? (
                  <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                ) : (
                  <Box style={styles.reviewAvatarPlaceholder} />
                )}
                <RestyleText style={styles.reviewName}>{review.name}</RestyleText>
              </Box>
              <RestyleText style={styles.reviewText}>{review.review}</RestyleText>
              <Box style={styles.reviewRating}>
                {Array(review.rating)
                  .fill()
                  .map((_, i) => (
                    <Icon key={i} name="star" size={16} color={colors.yellow} />
                  ))}
              </Box>
            </Box>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate("REVIEW")}>
            <RestyleText>{t("Explore.readMore")} 10+</RestyleText>
          </TouchableOpacity>
        </Box>
        {/* === Location === */}
        <TouchableOpacity onPress={() => navigation.navigate("FULL_SCREEN_MAP")}>
          <Box
            borderWidth={0.6}
            borderRadius={10}
            padding={"ten"}
            borderColor={"neutral300"}
            marginVertical={"ten"}
            style={styles.section}>
            <RestyleText style={styles.sectionTitle}>{t("Explore.location")}</RestyleText>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={name}
              />
            </MapView>
            <RestyleText style={styles.locationAddress}>{location.address}</RestyleText>
          </Box>
        </TouchableOpacity>

        <PriceSelect
          buttonText={t("Explore.select")}
          price={450}
          gradient
          priceSub={`+$45 ${t("Explore.taxesAndFees")}, ${t("Explore.perNightForRoom")}`}
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
    marginHorizontal: 8,
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
  name: {
    fontSize: 24,
    fontWeight: "bold",
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
    fontSize: 16,
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
  reviewRating: {
    flexDirection: "row",
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
