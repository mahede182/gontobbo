import React from "react";
import { StyleSheet } from "react-native";
import { Box } from "@/theme";

import LocationInput from "./LocationInput";
import DateInput from "./DateInput";
import GuestInput from "./GuestInput";
import SearchButton from "./SearchInput";
import { useNavigation } from "@react-navigation/native";

const SearchForm = () => {
  const navigation = useNavigation();
  return (
    <Box
      alignSelf={"center"}
      width={"80%"}
      backgroundColor="black"
      padding="twenty"
      style={styles.container}
    >
      <LocationInput
        location="New York, United States"
        onPress={() => {
          navigation.navigate("SELECT_LOCATION");
        }}
      />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        marginVertical="medium"
      >
        <DateInput date="10, Nov 25" onPress={() => {}} />
        <DateInput date="15, Nov 25" onPress={() => {}} />
      </Box>
      <GuestInput guests="1 Room, 2 Adults, 1 Children" onPress={() => {}} />
      <SearchButton onPress={() => {}} />
    </Box>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
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
