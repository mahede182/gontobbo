import { View, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { Box } from "@/theme";
import { colors } from "@/theme/colors";
import HeaderTitle from "@/components/HeaderTitle";
import {
  useGetFlightPreferencesQuery,
  useUpdateFlightPreferencesMutation,
} from "@/store/api/usersApi";
import PreferenceItem from "./components/PreferenceItem";
import { AppLogger } from "@/utils/applogger";

const FlightPreferencesScreen = () => {
  const { data: preferences, isLoading } = useGetFlightPreferencesQuery();
  const [updatePreferences] = useUpdateFlightPreferencesMutation();

  const handleToggle = async (key: string, value: boolean) => {
    try {
      await updatePreferences({
        isFlexibleDates:
          key === "isFlexibleDates" ? value : (preferences?.isFlexibleDates ?? false),
        isNonStopFlights:
          key === "isNonStopFlights" ? value : (preferences?.isNonStopFlights ?? false),
        isEarlyDeparture:
          key === "isEarlyDeparture" ? value : (preferences?.isEarlyDeparture ?? false),
        isLateDeparture:
          key === "isLateDeparture" ? value : (preferences?.isLateDeparture ?? false),
      }).unwrap();
    } catch (error) {
      AppLogger.error("Failed to update preferences", error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </View>
    );
  }

  const preferenceItems = [
    {
      key: "isFlexibleDates",
      label: "Flexible Dates",
      value: preferences?.isFlexibleDates ?? false,
    },
    {
      key: "isNonStopFlights",
      label: "Non-Stop Flights",
      value: preferences?.isNonStopFlights ?? false,
    },
    {
      key: "isEarlyDeparture",
      label: "Early Departure",
      value: preferences?.isEarlyDeparture ?? false,
    },
    {
      key: "isLateDeparture",
      label: "Late Departure",
      value: preferences?.isLateDeparture ?? false,
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Box flex={1} backgroundColor="white100" padding="medium">
        <HeaderTitle title="Flight Preferences" />
        <View style={styles.listContainer}>
          {preferenceItems.map((item, index) => (
            <PreferenceItem key={item.key} item={item} index={index} onToggle={handleToggle} />
          ))}
        </View>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  listContainer: {
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 10,
    shadowColor: colors.neutral700,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default FlightPreferencesScreen;
