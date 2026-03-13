/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { Box, RestyleText } from "@/theme";
import { ActivityIndicator, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderTitle from "@/components/HeaderTitle";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import Tag from "./component/Tag";
import PriceSelect from "./component/PriceSelect";
import { Divider } from "./component/Divider";
import { useGetHotelRoomsQuery, type Room } from "@/store/api/hotelsApi";
import { MotiView } from "moti";

const SelectRoom = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = (route.params as any) ?? {};
  const hotelId = params.hotelId;
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const { data: rooms = [], isLoading } = useGetHotelRoomsQuery(hotelId, {
    skip: !hotelId,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary700} />
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

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Select Room" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {rooms.map((room: Room, index) => {
          const roomImages = room.images?.slice(0, 3) ?? [];
          const isSelected = selectedRoomId === room.id;

          return (
            <MotiView
              key={room.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 500, delay: index * 100 }}
              style={[styles.roomCard, isSelected && styles.selectedCard]}>
              <Box style={styles.imageContainer}>
                <Image
                  source={roomImages[0] ? { uri: roomImages[0] } : images.dummyCard}
                  style={styles.mainImage}
                />
                <Box style={styles.sideImagesContainer}>
                  {roomImages[1] ? (
                    <Image source={{ uri: roomImages[1] }} style={styles.sideImage} />
                  ) : (
                    <Box style={[styles.sideImage, styles.placeholderImage]} />
                  )}
                  {roomImages[2] ? (
                    <Image source={{ uri: roomImages[2] }} style={styles.sideImage} />
                  ) : (
                    <Box style={[styles.sideImage, styles.placeholderImage]} />
                  )}
                </Box>
              </Box>

              <Box padding="medium">
                <RestyleText style={styles.roomName}>{room.name}</RestyleText>
                <Box style={styles.tagWrapper}>
                  {buildTags(room).map((tag, i) => (
                    <Tag key={i} tag={tag} />
                  ))}
                </Box>

                <Divider style={styles.divider} />

                <PriceSelect
                  gradient={isSelected}
                  buttonText={isSelected ? "Selected" : "Select"}
                  type="booking"
                  price={room.price}
                  priceSub={room.taxInfo || "+$45 taxes & fees, Per Night"}
                  onPress={() => setSelectedRoomId(room.id)}
                />
              </Box>
            </MotiView>
          );
        })}
      </ScrollView>

      {selectedRoomId && (
        <MotiView from={{ translateY: 100 }} animate={{ translateY: 0 }} style={styles.footer}>
          <PriceSelect
            gradient
            buttonText="Book Now"
            type="booking"
            price={selectedRoom?.price ?? 0}
            priceSub={selectedRoom?.taxInfo || "+taxes & fees, Total"}
            onPress={() =>
              navigation.navigate("REVIEW_BOOKING", { hotelId, roomId: selectedRoomId, ...params })
            }
          />
        </MotiView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  roomCard: {
    backgroundColor: colors.white100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral200,
    marginBottom: 20,
    overflow: "hidden",
  },
  selectedCard: {
    borderColor: colors.primary700,
    borderWidth: 2,
  },
  imageContainer: {
    flexDirection: "row",
    height: 180,
  },
  mainImage: {
    flex: 2,
    height: "100%",
  },
  sideImagesContainer: {
    flex: 1,
    paddingLeft: 2,
  },
  sideImage: {
    flex: 1,
    marginBottom: 2,
  },
  placeholderImage: {
    backgroundColor: colors.neutral200,
  },
  roomName: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 20,
    color: colors.black100,
    marginBottom: 8,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: colors.neutral100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
  },
});

export default SelectRoom;
