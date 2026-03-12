import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";

import { useSearchHotelsQuery } from "@/store/api/hotelsApi";
import ResultCard from "./component/ResultCard";
import Dropdown from "@/components/Dropdown";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MotiView } from "moti";
import Icon from "@expo/vector-icons/MaterialIcons";
import { typography } from "@/theme/typography";

const SearchResult = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = (route.params as any) ?? {};
  const [sortBy, setSortBy] = useState<string>("");

  const location = params.location || params.selectedLocation || "Nearby Hotels";
  const subtitle = [
    params.checkIn,
    params.checkOut,
    params.rooms ? `${params.rooms} Rooms` : null,
    params.guests ? `${params.guests} Adults` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const searchParams = useMemo(() => {
    const p: any = {};
    if (params.location || params.selectedLocation)
      p.location = params.location || params.selectedLocation;
    if (params.checkIn) p.checkIn = params.checkIn;
    if (params.checkOut) p.checkOut = params.checkOut;
    if (params.guests) p.guests = params.guests;
    if (params.rooms) p.rooms = params.rooms;
    if (sortBy === "price") {
      p.sortBy = "price";
      p.sortOrder = "asc";
    } else if (sortBy === "A-Z") {
      p.sortBy = "name";
      p.sortOrder = "asc";
    }
    return p;
  }, [params, sortBy]);

  const { data, isLoading } = useSearchHotelsQuery(searchParams);
  const hotels = (data as any)?.data ?? data ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.black100} />
        </TouchableOpacity>

        <Box flex={1} marginHorizontal="small">
          <RestyleText style={styles.title} numberOfLines={1}>
            {location}
          </RestyleText>
          <RestyleText style={styles.subtitle} numberOfLines={1}>
            {subtitle || "All Hotels"}
          </RestyleText>
        </Box>

        <TouchableOpacity style={styles.editButton} onPress={() => navigation.goBack()}>
          <Icon name="edit" size={20} color={colors.primary700} />
        </TouchableOpacity>
      </MotiView>
      <Box style={styles.filtersWrapper}>
        <Box flex={1} marginRight="small">
          <Dropdown
            label="Sort By"
            data={[
              { label: "A-Z", value: "A-Z" },
              { label: "Price low - high", value: "price" },
            ]}
          />
        </Box>
        <Box flex={1}>
          <Dropdown
            label="Rating"
            data={[
              { label: "5 Stars", value: "5" },
              { label: "4 Stars", value: "4" },
              { label: "3 Stars", value: "3" },
            ]}
          />
        </Box>
      </Box>
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color={colors.primary700} />
          <RestyleText style={styles.loadingText}>Finding best deals...</RestyleText>
        </Box>
      ) : (
        <FlatList
          data={hotels}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "timing", duration: 400, delay: index * 100 }}>
              <ResultCard
                id={item.id}
                name={item.name}
                location={item.location}
                price={item.startingPrice ?? 0}
                imageUrl={item.images?.[0]}
                searchParams={params}
              />
            </MotiView>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Box padding="xxl" alignItems="center">
              <RestyleText style={styles.emptyText}>No hotels found for this criteria.</RestyleText>
            </Box>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 18,
    color: colors.black100,
  },
  subtitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.neutral500,
  },
  editButton: {
    padding: 8,
    backgroundColor: colors.primary50,
    borderRadius: 8,
  },
  filtersWrapper: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  loadingText: {
    marginTop: 12,
    fontFamily: typography.poppinsMedium,
    color: colors.neutral500,
  },
  emptyText: {
    fontFamily: typography.poppinsMedium,
    color: colors.neutral500,
    textAlign: "center",
  },
});

export default SearchResult;
