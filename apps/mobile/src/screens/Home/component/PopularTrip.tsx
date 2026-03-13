import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Box } from "@/theme";
import { useTranslation } from "react-i18next";
import TripCard from "./TripCard";
import { useGetPopularTripsQuery, type Trip } from "@/store/api/tripsApi";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";
import { fontSizes } from "@/theme/fontSizes";

const PopularTrip: React.FC = () => {
  const { t } = useTranslation();
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
    <Box paddingHorizontal="medium" marginTop="ten">
      <GradientTitle style={styles.title}>{t("Home.popularTrip")}</GradientTitle>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={trips}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: fontSizes.lg,
    marginBottom: spacing.five,
  },
});

export default PopularTrip;
