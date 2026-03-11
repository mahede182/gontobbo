import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Box } from "@/theme";

import LocationInput from "./LocationInput";
import DateInput from "./DateInput";
import GuestInput from "./GuestInput";
import SearchButton from "./SearchInput";
import { useNavigation } from "@react-navigation/native";
import GuestModal from "../GuestModal";
import { colors } from "@/theme/colors";
import SelectFlight from "./SelectFlight";

const SearchForm = () => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = (guests: { rooms: number; adults: number; children: number }) => {
    setRooms(guests.rooms);
    setAdults(guests.adults);
    setChildren(guests.children);
    setIsModalVisible(false);
  };

  return (
    <Box
      alignSelf={"center"}
      width={"80%"}
      backgroundColor="black100"
      padding="twenty"
      style={styles.container}>
      <LocationInput
        location="New York,"
        country="United States"
        onPress={() => {
          navigation.navigate("SELECT_LOCATION");
        }}
      />
      <Box flexDirection="row" justifyContent="space-between" marginVertical="medium">
        <DateInput
          date="10, Nov 25"
          onPress={() => {
            navigation.navigate("PICK_DATE");
          }}
        />
        <DateInput
          date={"15, Nov 25"}
          onPress={() => {
            navigation.navigate("PICK_DATE");
          }}
        />
      </Box>
      <GuestInput rooms={rooms} adults={adults} children={children} onPress={openModal} />
      <SelectFlight
        onPress={openModal}
        title="Select Flights"
        subTitle="Choose with or Without Flight"
      />
      <GuestModal
        isVisible={isModalVisible}
        onClose={closeModal}
        initialRooms={rooms}
        initialAdults={adults}
        initialChildren={children}
      />
      <SearchButton
        onPress={() => {
          navigation.navigate("SEARCH_RESULT", {
            rooms,
            guests: adults + children,
            location: "New York", // hardcoded default from above for now
          });
        }}
      />
    </Box>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 5,
    marginTop: 15,
  },
});
