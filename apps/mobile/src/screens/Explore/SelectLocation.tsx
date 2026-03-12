import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Box, RestyleText } from "@/theme";
import Icon from "@expo/vector-icons/MaterialIcons";
import GradientTitle from "@/components/GradientTitle";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@/components/Input";
import { typography } from "@/theme/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { useSearchLocationsQuery, useGetPopularLocationsQuery } from "@/store/api/locationsApi";
import type { Location } from "@/@types/api.type";

const LocationSelect = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: popularLocations = [], isLoading: isLoadingPopular } =
    useGetPopularLocationsQuery();
  const { data: searchResults = [], isFetching: isSearching } = useSearchLocationsQuery(
    searchQuery,
    {
      skip: searchQuery.length < 2,
    },
  );

  const displayLocations = searchQuery.length >= 2 ? searchResults : popularLocations;

  const handleSelectLocation = (location: Location) => {
    navigation.navigate("EXPLORE_SEARCH", { selectedLocation: location.name });
  };

  const renderItem = ({ item, index }: { item: Location; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "timing", duration: 400, delay: index * 50 }}>
      <TouchableOpacity style={styles.locationItem} onPress={() => handleSelectLocation(item)}>
        <Box style={styles.iconCircle}>
          <Icon name="location-on" size={20} color={colors.primary700} />
        </Box>
        <Box flex={1}>
          <RestyleText style={styles.locationName}>{item.name}</RestyleText>
          <RestyleText style={styles.locationSubtitle}>{item.country || "Location"}</RestyleText>
        </Box>
        <Icon name="chevron-right" size={20} color={colors.neutral300} />
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Box paddingHorizontal="large">
        <Box flexDirection={"row"} alignItems={"center"} marginBottom={"medium"}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.black100} />
          </TouchableOpacity>
          <GradientTitle style={styles.headerTitle}>Select Location</GradientTitle>
        </Box>

        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={"Where do you want to stay?"}
          icon="search"
          autoFocus
        />
      </Box>

      <Box
        backgroundColor={"neutral100"}
        paddingHorizontal={"large"}
        paddingVertical={"small"}
        marginTop={"small"}>
        <RestyleText style={styles.sectionTitle}>
          {searchQuery.length >= 2 ? "Search Results" : "Popular Locations"}
        </RestyleText>
      </Box>

      {isLoadingPopular ||
      (searchQuery.length >= 2 && isSearching && searchResults.length === 0) ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary700} />
      ) : (
        <FlatList
          data={displayLocations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
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
  backButton: {
    padding: 4,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
  },
  sectionTitle: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 14,
    color: colors.neutral600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  locationName: {
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
    color: colors.black100,
  },
  locationSubtitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.neutral500,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral100,
  },
});

export default LocationSelect;
