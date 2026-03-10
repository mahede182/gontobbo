/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { Box, RestyleText } from "@/theme";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderTitle from "@/components/HeaderTitle";
import { typography } from "@/theme/typography";
import Tag from "./component/Tag";
import PriceSelect from "./component/PriceSelect";
import { Divider } from "./component/Divider";
import { getHotelRooms, Room } from "@/api/hotels";

const SelectRoom = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const hotelId = (route.params as any)?.hotelId;
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (hotelId) {
      getHotelRooms(hotelId)
        .then(setRooms)
        .finally(() => setLoading(false));
    }
  }, [hotelId]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const buildTags = (room: Room) => {
    const tags: string[] = [];
    if (room.sqft) tags.push(`${room.sqft} sq.ft`);
    if (room.view) tags.push(room.view);
    if (room.bedType) tags.push(room.bedType);
    if (room.tags) tags.push(...room.tags);
    if (room.maxGuests) tags.push(`Accommodates ${room.maxGuests} Guests`);
    if (!room.isRefundable) tags.push("Non-Refundable");
    else tags.push("Refundable");
    return tags;
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Select Room" />
      <ScrollView showsHorizontalScrollIndicator>
        {rooms.map((room) => {
          const roomImages = room.images?.slice(0, 3) ?? [];
          return (
            <Box key={room.id}>
              <Box style={styles.imageContainer}>
                <Image
                  source={
                    roomImages[0] ? { uri: roomImages[0] } : require("@/assets/hotel_image_1.png")
                  }
                  style={styles.leftImage}
                />
                <Box style={styles.rightImageContainer}>
                  {roomImages[1] && (
                    <Image source={{ uri: roomImages[1] }} style={styles.rightImage} />
                  )}
                  {roomImages[2] && (
                    <Image source={{ uri: roomImages[2] }} style={styles.rightImage} />
                  )}
                </Box>
              </Box>
              <Box>
                <RestyleText style={styles.title}>{room.name}</RestyleText>
                <Box style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {buildTags(room).map((tag, i) => (
                    <Tag key={i} tag={tag} />
                  ))}
                </Box>
                <Divider />
                <TouchableOpacity onPress={() => setSelectedRoom(room)}>
                  <PriceSelect
                    gradient={selectedRoom?.id === room.id}
                    buttonText="Select"
                    type="booking"
                    price={room.price}
                    priceSub={room.taxInfo || "+taxes & fees, Per Night for 1 Room"}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          );
        })}
      </ScrollView>
      {selectedRoom && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("REVIEW_BOOKING", { hotelId, roomId: selectedRoom.id })
          }>
          <PriceSelect
            gradient
            buttonText="Book Now"
            type="booking"
            price={selectedRoom.price}
            priceSub={selectedRoom.taxInfo || "+taxes & fees, Per Night for 1 Room"}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  imageContainer: {
    flexDirection: "row",
    paddingVertical: 10,
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
