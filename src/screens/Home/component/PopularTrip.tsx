import React from "react";
import { ScrollView } from "react-native";
import { Box } from "@/theme";
import { useTranslation } from "react-i18next";
import TripCard from "./TripCard";
import { popularTrip } from "@/data/popularTripData";
import GradientTitle from "@/components/GradientTitle";

const PopularTrip: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box marginTop="twenty">
      <GradientTitle
        style={{
          marginVertical: 10,
          paddingHorizontal: 15,
        }}
        variant="gradientTitle">
        {t("Home.popularTrip")}
      </GradientTitle>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {popularTrip.map((trip, index) => (
          <TripCard
            key={index}
            image={trip.image}
            title={trip.title}
            duration={trip.duration}
            feature={trip.feature}
            peopleJoined={trip.peopleJoined}
            avatars={trip.avatars}
          />
        ))}
      </ScrollView>
    </Box>
  );
};

export default PopularTrip;
