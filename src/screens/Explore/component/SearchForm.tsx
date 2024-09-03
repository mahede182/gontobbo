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
// import { searchHotel } from "@/machine/searchService";

const SearchForm = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
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
        location="New York, United States"
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
      <GuestInput onPress={openModal} />
      <SelectFlight
        onPress={openModal}
        title="Select Flights"
        subTitle="Choose with or Without Flight"
      />
      <GuestModal isVisible={isModalVisible} onClose={closeModal} />
      <SearchButton
        onPress={() => {
          navigation.navigate("SEARCH_RESULT");
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
