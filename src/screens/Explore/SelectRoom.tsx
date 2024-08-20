import React from "react";
import { Box, RestyleText } from "@/theme";
import { Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderTitle from "@/components/HeaderTitle";
import { typography } from "@/theme/typography";
import Tag from "./component/Tag";
import PriceSelect from "./component/PriceSelect";
import { Divider } from "./component/Divider";

const SelectRoom = () => {
  const navigation = useNavigation();

  return (
    <Box style={styles.container}>
      {/* === Header Section === */}
      <HeaderTitle title="Select Room" />
      <ScrollView showsHorizontalScrollIndicator>
        {/* === Room Package 1=== */}
        {/* images section */}
        <Box style={styles.imageContainer}>
          <Image
            source={require("@/assets/hotel_image_1.png")}
            style={styles.leftImage}
          />
          <Box style={styles.rightImageContainer}>
            <Image
              source={require("@/assets/hotel_image_1.png")}
              style={styles.rightImage}
            />
            <Image
              source={require("@/assets/hotel_image_1.png")}
              style={styles.rightImage}
            />
          </Box>
        </Box>
        <Box>
          {/* ===  Standard Room === */}
          <RestyleText style={styles.title}>Standard Room</RestyleText>
          <Box
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Tag tag="200 sq.ft" />
            <Tag tag="City View" />
            <Tag tag="Queen Bed" />
            <Tag tag="Free Wifi" />
            <Tag tag="Free Breakfast" />
            <Tag tag="Free Airport Shuttle" />
            <Tag tag="Free Self Parking" />
            <Tag tag="Accommodates 2 Adults & Child" />
            <Tag tag="Non-Refundable" />
          </Box>
          <Divider />
          {/* === Price Select === */}
          <PriceSelect
            gradient={false}
            buttonText="Select"
            type="booking"
            price={490}
            priceSub="+$45 taxes & services fees, Per Night for 1 Rooms"
          />
        </Box>
        {/* === Room Package 2=== */}
        <Box style={styles.imageContainer}>
          <Image
            source={require("@/assets/hotel_image_1.png")}
            style={styles.leftImage}
          />
          <Box style={styles.rightImageContainer}>
            <Image
              source={require("@/assets/hotel_image_1.png")}
              style={styles.rightImage}
            />
            <Image
              source={require("@/assets/hotel_image_1.png")}
              style={styles.rightImage}
            />
          </Box>
        </Box>
        <Box>
          {/* ===  Standard Room === */}
          <RestyleText style={styles.title}>Standard Room</RestyleText>
          <Box
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Tag tag="200 sq.ft" />
            <Tag tag="City View" />
            <Tag tag="Queen Bed" />
            <Tag tag="Free Wifi" />
            <Tag tag="Free Breakfast" />
            <Tag tag="Free Airport Shuttle" />
            <Tag tag="Free Self Parking" />
            <Tag tag="Accommodates 2 Adults & Child" />
            <Tag tag="Non-Refundable" />
          </Box>
          <Divider />
          {/* === Price Select === */}
          <PriceSelect
            gradient={false}
            buttonText="Select"
            type="booking"
            price={490}
            priceSub="+$45 taxes & services fees, Per Night for 1 Rooms"
          />
        </Box>
        {/* === Room Package 3=== */}
        <Box style={styles.imageContainer}>
          <Image
            source={require("@/assets/hotel_image_1.png")}
            style={styles.leftImage}
          />
          <Box style={styles.rightImageContainer}>
            <Image
              source={require("@/assets/hotel_image_1.png")}
              style={styles.rightImage}
            />
            <Image
              source={require("@/assets/hotel_image_1.png")}
              style={styles.rightImage}
            />
          </Box>
        </Box>
        <Box>
          {/* ===  Standard Room === */}
          <RestyleText style={styles.title}>Standard Room</RestyleText>
          <Box
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: 20,
            }}
          >
            <Tag tag="200 sq.ft" />
            <Tag tag="City View" />
            <Tag tag="Queen Bed" />
            <Tag tag="Free Wifi" />
            <Tag tag="Free Breakfast" />
            <Tag tag="Free Airport Shuttle" />
            <Tag tag="Free Self Parking" />
            <Tag tag="Accommodates 2 Adults & Child" />
            <Tag tag="Non-Refundable" />
          </Box>
          <Divider />
          {/* === Price Select === */}
          <PriceSelect
            gradient={false}
            buttonText="Select"
            type="booking"
            price={490}
            priceSub="+$45 taxes & services fees, Per Night for 1 Rooms"
          />
        </Box>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("REVIEW_BOOKING")}>
        <PriceSelect
          gradient
          buttonText="Book Now"
          type="booking"
          price={490}
          priceSub="+$45 taxes & services fees, Per Night for 1 Rooms"
        />
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    padding: 10,
  },
  leftImage: {
    width: "50%",
    height: 200,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  rightImageContainer: {
    width: "50%",
    height: 200,
    justifyContent: "space-between",
  },
  rightImage: {
    height: "49%",
    borderRadius: 10,
  },
  title: {
    fontFamily: typography.poppinsMedium,
    fontSize: 22,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default SelectRoom;
