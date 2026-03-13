import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";

import { useSearchHotelsQuery } from "@/store/api/hotelsApi";
import ResultCard from "./component/ResultCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MotiView } from "moti";
import Icon from "@expo/vector-icons/MaterialIcons";
import { typography } from "@/theme/typography";
import { useTranslation } from "react-i18next";

const SearchResult = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
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
      {/* Premium Header */}
      <MotiView
        from={{ translateY: -20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        style={styles.header}>
        <Box flexDirection="row" alignItems="center" flex={1}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.black100} />
          </TouchableOpacity>

          <Box marginLeft="medium" flex={1}>
            <RestyleText style={styles.title} numberOfLines={1}>
              {location}
            </RestyleText>
            <RestyleText style={styles.subtitle} numberOfLines={1}>
              {subtitle || "All Hotels"}
            </RestyleText>
          </Box>
        </Box>

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Icon name="edit" size={20} color={colors.primary700} />
        </TouchableOpacity>
      </MotiView>

      {/* Filter Chips Bar */}
      <Box style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, sortBy !== "" && styles.activeFilterChip]}
            onPress={() => setSortBy((prev) => (prev === "price" ? "A-Z" : "price"))}>
            <RestyleText
              style={[styles.filterChipText, sortBy !== "" && styles.activeFilterChipText]}>
              Sort: {sortBy === "price" ? "Price" : sortBy === "A-Z" ? "Name" : "Default"}
            </RestyleText>
            <Icon
              name="keyboard-arrow-down"
              size={16}
              color={sortBy !== "" ? colors.white : colors.neutral600}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <RestyleText style={styles.filterChipText}>Rating</RestyleText>
            <Icon name="keyboard-arrow-down" size={16} color={colors.neutral600} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <RestyleText style={styles.filterChipText}>Price Range</RestyleText>
            <Icon name="keyboard-arrow-down" size={16} color={colors.neutral600} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <RestyleText style={styles.filterChipText}>Amenities</RestyleText>
            <Icon name="keyboard-arrow-down" size={16} color={colors.neutral600} />
          </TouchableOpacity>
        </ScrollView>
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
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 400, delay: index * 100 }}>
              <ResultCard
                id={item.id}
                name={item.name}
                location={item.location}
                price={item.startingPrice ?? 0}
                rating={item.rating}
                reviewCount={item.reviewCount}
                imageUrl={item.images?.[0]}
                searchParams={params}
              />
            </MotiView>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Box
              flex={1}
              paddingTop="xxl"
              alignItems="center"
              justifyContent="center"
              style={{ marginTop: 60 }}>
              <Box style={styles.emptyIconContainer}>
                <Icon name="search-off" size={64} color={colors.neutral300} />
              </Box>
              <RestyleText style={styles.emptyTitle}>No Results Found</RestyleText>
              <RestyleText style={styles.emptySubtitle}>
                We couldn't find any hotels matching your criteria in {location}.
              </RestyleText>
              <TouchableOpacity style={styles.resetButton} onPress={() => navigation.goBack()}>
                <RestyleText style={styles.resetButtonText}>Adjust Search</RestyleText>
              </TouchableOpacity>
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
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    backgroundColor: colors.white100,
    borderRadius: 12,
  },
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 18,
    color: colors.black100,
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.neutral500,
  },
  editButton: {
    padding: 10,
    backgroundColor: colors.primary50,
    borderRadius: 12,
  },
  filtersWrapper: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white100,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.neutral200,
    gap: 4,
  },
  filterChipText: {
    fontFamily: typography.poppinsMedium,
    fontSize: 13,
    color: colors.neutral700,
  },
  activeFilterChip: {
    backgroundColor: colors.primary700,
    borderColor: colors.primary700,
  },
  activeFilterChipText: {
    color: colors.white,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  loadingText: {
    marginTop: 12,
    fontFamily: typography.poppinsMedium,
    color: colors.neutral500,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.white,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  emptyTitle: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 20,
    color: colors.black100,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.neutral500,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 20,
    marginBottom: 32,
  },
  resetButton: {
    backgroundColor: colors.primary700,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  resetButtonText: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 16,
    color: colors.white,
  },
});

export default SearchResult;
