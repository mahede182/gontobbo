import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Box } from "@/theme";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { fontSizes } from "@/theme/fontSizes";
import { colors } from "@/theme/colors";
import { useGetPopularTripsQuery, type Trip } from "@/store/api/tripsApi";
import TripCard from "../../Home/component/TripCard";

const TripExplore: React.FC = () => {
  const { data: trips = [], isLoading } = useGetPopularTripsQuery();

  const renderItem: ListRenderItem<Trip> = useCallback(
    ({ item }) => (
      <TripCard
        id={item.id}
        image={item.image}
        title={item.title}
        duration={item.duration}
        feature={item.feature}
        peopleJoined={item.peopleJoined}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Trip) => item.id, []);

  return (
    <Box flex={1} paddingHorizontal="medium" marginTop="twenty">
      <GradientTitle style={styles.title}>Popular Trips</GradientTitle>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary700} />
      ) : (
        <FlatList
          data={trips}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: fontSizes.xxl,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 120,
  },
});

export default TripExplore;
