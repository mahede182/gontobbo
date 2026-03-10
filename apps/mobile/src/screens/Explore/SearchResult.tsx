import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";

import { searchHotels, Hotel } from "@/api/hotels";
import ResultCard from "./component/ResultCard";
import Dropdown from "@/components/Dropdown";
import { useRoute } from "@react-navigation/native";

const SearchResult = ({ navigation }) => {
  const route = useRoute();
  const params = (route.params as any) ?? {};
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("");

  const location = params.location ?? "";
  const subtitle = [
    params.checkIn,
    params.checkOut,
    params.rooms ? `${params.rooms} Rooms` : null,
    params.guests ? `${params.guests} Adults` : null,
  ]
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    const fetchParams: any = {};
    if (params.location) fetchParams.location = params.location;
    if (params.checkIn) fetchParams.checkIn = params.checkIn;
    if (params.checkOut) fetchParams.checkOut = params.checkOut;
    if (params.guests) fetchParams.guests = params.guests;
    if (params.rooms) fetchParams.rooms = params.rooms;
    if (sortBy === "price") {
      fetchParams.sortBy = "price";
      fetchParams.sortOrder = "asc";
    } else if (sortBy === "A-Z") {
      fetchParams.sortBy = "name";
      fetchParams.sortOrder = "asc";
    }

    setLoading(true);
    searchHotels(fetchParams)
      .then((res) => setHotels(res.data))
      .finally(() => setLoading(false));
  }, [params.location, params.checkIn, params.checkOut, params.guests, params.rooms, sortBy]);

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.header}>
        <Box style={styles.headerContent}>
          <RestyleText style={styles.title}>{location || "Hotels"}</RestyleText>
          <RestyleText style={styles.subtitle}>{subtitle || "All results"}</RestyleText>
        </Box>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate("SWITCH_TO_FLIGHT")}>
          <RestyleText style={styles.searchButtonText}>Search</RestyleText>
        </TouchableOpacity>
      </Box>
      <Box style={styles.filters}>
        <Box alignItems={"center"} justifyContent={"center"}>
          <Dropdown
            label="Sort By"
            data={[
              { label: "A-Z", value: "A-Z" },
              { label: "Price low - high", value: "price" },
            ]}
            onSelect={(item: any) => setSortBy(item.value)}
          />
        </Box>
        <Box alignItems={"center"} justifyContent={"center"}>
          <Dropdown
            label="Star Rating"
            data={[
              { label: "⭐⭐⭐⭐⭐", value: "5" },
              { label: "⭐⭐⭐⭐", value: "4" },
              { label: "⭐⭐⭐", value: "3" },
            ]}
          />
        </Box>
      </Box>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={hotels}
          renderItem={({ item }) => (
            <ResultCard
              id={item.id}
              name={item.name}
              location={item.location}
              price={item.startingPrice ?? 0}
              imageUrl={item.images?.[0]}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

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
