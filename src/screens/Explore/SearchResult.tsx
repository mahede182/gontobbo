import React from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";

import searchResults from "../../data/searchResults";
import ResultCard from "./component/ResultCard";
import Dropdown from "@/components/Dropdown";

const SearchResult = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Box style={styles.header}>
      <Box style={styles.headerContent}>
        <RestyleText style={styles.title}>New York</RestyleText>
        <RestyleText style={styles.subtitle}>10 Nov - 15 Nov, 1 Rooms, 1 Adults...</RestyleText>
      </Box>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("SWITCH_TO_FLIGHT")}>
        <RestyleText style={styles.searchButtonText}>Search</RestyleText>
      </TouchableOpacity>
    </Box>
    <Box style={styles.filters}>
      {/* <TouchableOpacity style={styles.filterContainer}>
        <Icon name="swap-vertical" size={16} color={"#000"} />
        <RestyleText style={[styles.label, { marginLeft: 8 }]}>Sort By</RestyleText>
      </TouchableOpacity> */}
      <Box alignItems={"center"} justifyContent={"center"}>
        <Dropdown
          label="Sort By"
          data={[
            { label: "A-Z", value: "A-Z" },
            { label: "Price low - high", value: "price" },
            { label: "Year", value: "Year" },
          ]}
        />
      </Box>
      <Box alignItems={"center"} justifyContent={"center"}>
        <Dropdown
          label="All Filter"
          data={[
            { label: "A-Z", value: "A-Z" },
            { label: "Price low - high", value: "price" },
            { label: "Year", value: "Year" },
          ]}
        />
      </Box>
      <Box alignItems={"center"} justifyContent={"center"}>
        <Dropdown
          label="Star Rating"
          data={[
            { label: "*****", value: "5" },
            { label: "****", value: "4" },
            { label: "***", value: "3" },
          ]}
        />
      </Box>
      {/* <TouchableOpacity style={styles.filterContainer}>
        <Icon name="search" size={16} color={"#000"} /> 
        <RestyleText style={styles.label}>All Filters</RestyleText>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.filterContainer}>
        <Icon name="star-half-outline" size={16} color={"#000"} />
        <RestyleText style={styles.label}>Star Rating</RestyleText>
      </TouchableOpacity> */}
    </Box>
    <FlatList
      data={searchResults}
      renderItem={({ item }) => <ResultCard {...item} />}
      keyExtractor={(item) => item.name}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondary500,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral500,
  },
  searchButton: {
    backgroundColor: colors.blue800,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  searchButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default SearchResult;
