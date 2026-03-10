import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Box } from "@/theme";
import { useTranslation } from "react-i18next";
import TripCard from "./TripCard";
import { getPopularTrips, Trip } from "@/api/trips";
import GradientTitle from "@/components/GradientTitle";
import { dynamicCSS } from "@/utils/styles";

const PopularTrip: React.FC = () => {
  const { t } = useTranslation();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularTrips()
      .then(setTrips)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box marginTop="twenty">
      <GradientTitle
        style={(dynamicCSS("marginVertical", 10), dynamicCSS("paddingHorizontal", 15))}
        variant="gradientTitle">
        {t("Home.popularTrip")}
      </GradientTitle>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={dynamicCSS("paddingHorizontal", 20)}>
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              image={trip.image}
              title={trip.title}
              duration={trip.duration}
              feature={trip.feature}
              peopleJoined={trip.peopleJoined}
            />
          ))}
        </ScrollView>
      )}
    </Box>
  );
};

export default PopularTrip;
