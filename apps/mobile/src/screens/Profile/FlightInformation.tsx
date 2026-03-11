import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Box } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import FlightStatusCard from "./components/FlightStatusCard";
import FlightDetailsCard from "./components/FlightDetailsCard";
import FlightServicesCard from "./components/FlightServicesCard";

const FlightInformation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Flight Information" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <Box padding="medium">
          <FlightStatusCard />
          <FlightDetailsCard />
          <FlightServicesCard />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
  },
});
