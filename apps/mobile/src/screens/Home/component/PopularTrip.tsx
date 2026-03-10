import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Box } from "@/theme";
import { useTranslation } from "react-i18next";
import TripCard from "./TripCard";
import { getPopularTrips, Trip } from "@/api/trips";
import GradientTitle from "@/components/GradientTitle";
import { typography } from "@/theme/typography";

const PopularTrip: React.FC = () => {
  const { t } = useTranslation();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularTrips()
      .then(setTrips)
      .finally(() => setLoading(false));
  }, []);

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
    <Box paddingHorizontal="medium" marginTop="twenty">
      <GradientTitle style={styles.title}>{t("Home.popularTrip")}</GradientTitle>
      {loading ? (
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
    fontSize: 20,
    marginBottom: 10,
  },
});

export default PopularTrip;
