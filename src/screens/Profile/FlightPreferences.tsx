import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

const FlightPreferencesScreen = () => {
  const [isFlexibleDatesEnabled, setIsFlexibleDatesEnabled] = React.useState(false);
  const [isNonStopFlightsEnabled, setIsNonStopFlightsEnabled] = React.useState(false);
  const [isEarlyDepartureEnabled, setIsEarlyDepartureEnabled] = React.useState(false);
  const [isLateDepartureEnabled, setIsLateDepartureEnabled] = React.useState(false);

  const toggleFlexibleDates = () => setIsFlexibleDatesEnabled((prevState) => !prevState);
  const toggleNonStopFlights = () => setIsNonStopFlightsEnabled((prevState) => !prevState);
  const toggleEarlyDeparture = () => setIsEarlyDepartureEnabled((prevState) => !prevState);
  const toggleLateDeparture = () => setIsLateDepartureEnabled((prevState) => !prevState);

  return (
    <Box flex={1} backgroundColor="white100" padding="medium">
      <RestyleText variant="header">Flight Preferences</RestyleText>

      <View style={styles.preferenceContainer}>
        <RestyleText variant="body">Flexible Dates</RestyleText>
        <Switch
          value={isFlexibleDatesEnabled}
          onValueChange={toggleFlexibleDates}
          trackColor={{ true: colors.primary500, false: colors.neutral300 }}
          thumbColor={colors.white100}
        />
      </View>

      <View style={styles.preferenceContainer}>
        <RestyleText variant="body">Non-Stop Flights</RestyleText>
        <Switch
          value={isNonStopFlightsEnabled}
          onValueChange={toggleNonStopFlights}
          trackColor={{ true: colors.primary500, false: colors.neutral300 }}
          thumbColor={colors.white100}
        />
      </View>

      <View style={styles.preferenceContainer}>
        <RestyleText variant="body">Early Departure</RestyleText>
        <Switch
          value={isEarlyDepartureEnabled}
          onValueChange={toggleEarlyDeparture}
          trackColor={{ true: colors.primary500, false: colors.neutral300 }}
          thumbColor={colors.white100}
        />
      </View>

      <View style={styles.preferenceContainer}>
        <RestyleText variant="body">Late Departure</RestyleText>
        <Switch
          value={isLateDepartureEnabled}
          onValueChange={toggleLateDeparture}
          trackColor={{ true: colors.primary500, false: colors.neutral300 }}
          thumbColor={colors.white100}
        />
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  preferenceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
});

export default FlightPreferencesScreen;
