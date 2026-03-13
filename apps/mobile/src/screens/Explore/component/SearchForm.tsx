import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Box } from "@/theme";

import LocationInput from "./LocationInput";
import DateInput from "./DateInput";
import GuestInput from "./GuestInput";
import SearchButton from "./SearchInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import GuestModal from "../GuestModal";
import { colors } from "@/theme/colors";
import SelectHotel from "./SelectHotel";

interface SearchFormProps {
  initialLocation?: string;
}

const SearchForm = ({ initialLocation }: SearchFormProps) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // States for dynamic data
  const [location, setLocation] = useState(initialLocation || "");
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Sync initialLocation from props if it changes
  React.useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);

  // Handle params if returning from PICK_DATE
  React.useEffect(() => {
    if (route.params?.selectedCheckInDate) {
      setCheckInDate(route.params.selectedCheckInDate);
    }
    if (route.params?.selectedCheckOutDate) {
      setCheckOutDate(route.params.selectedCheckOutDate);
    }
  }, [route.params]);

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
        location={location}
        country={location ? "" : ""} // If we had country data we'd use it
        placeholder="Search Location"
        onPress={() => {
          navigation.navigate("SELECT_LOCATION");
        }}
      />
      <Box flexDirection="row" justifyContent="space-between" marginVertical="medium">
        <DateInput
          date={checkInDate}
          label="Check In"
          placeholder="Check In"
          onPress={() => {
            navigation.navigate("PICK_DATE");
          }}
        />
        <DateInput
          date={checkOutDate}
          label="Check Out"
          placeholder="Check Out"
          onPress={() => {
            navigation.navigate("PICK_DATE");
          }}
        />
      </Box>
      <GuestInput rooms={rooms} adults={adults} children={children} onPress={openModal} />
      <SelectHotel
        onPress={() => {
          // Future: Open hotel selection or filters
        }}
        title="Select Hotels"
        subTitle="Filter by property type or brand"
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
            location: location || "New York", // Fallback for debugging
            checkIn: checkInDate,
            checkOut: checkOutDate,
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
