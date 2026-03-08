import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { Divider } from "@/screens/Explore/component/Divider";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { images } from "@/theme/images";

const FlightInformation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Flight Information" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box padding="medium">
          {/* Flight Status Section */}
          <Box
            borderWidth={1}
            borderColor="neutral300"
            borderRadius={8}
            padding="medium"
            marginBottom="medium"
            backgroundColor="blue100">
            <RestyleText variant="h2" fontWeight="600" marginBottom="small">
              Flight Status
            </RestyleText>
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
              <RestyleText variant="textBase" color="success">
                On Time
              </RestyleText>
              <RestyleText variant="textBase">Flight: AA 1234</RestyleText>
            </Box>
          </Box>

          {/* Flight Details Section */}
          <Box
            borderWidth={1}
            borderColor="primary700"
            borderRadius={8}
            padding="medium"
            marginBottom="medium">
            <RestyleText variant="h2" fontWeight="600" marginBottom="small">
              Flight Details
            </RestyleText>

            <Box marginBottom="medium">
              <RestyleText variant="textBase" color="neutral600">
                Departure
              </RestyleText>
              <Box flexDirection="row" alignItems="center" marginTop="small">
                <Image source={images.plane} style={styles.planeIcon} />
                <Box>
                  <RestyleText variant="textBase" fontWeight="600">
                    10:30 AM
                  </RestyleText>
                  <RestyleText variant="caption" color="neutral600">
                    Thu, 11 Feb
                  </RestyleText>
                  <RestyleText variant="caption" color="neutral600">
                    JFK International Airport
                  </RestyleText>
                </Box>
              </Box>
            </Box>

            <Divider />

            <Box marginVertical="small">
              <Box alignItems="center">
                <RestyleText variant="textBase" color="primary700">
                  14 hours
                </RestyleText>
                <Box height={1} width={100} backgroundColor="primary500" marginVertical="small" />
                <RestyleText variant="caption" color="neutral600">
                  1 stop - Dubai (DXB)
                </RestyleText>
              </Box>
            </Box>

            <Divider />

            <Box marginTop="medium">
              <RestyleText variant="textBase" color="neutral600">
                Arrival
              </RestyleText>
              <Box flexDirection="row" alignItems="center" marginTop="small">
                <Image source={images.plane} style={styles.planeIconRotated} />
                <Box>
                  <RestyleText variant="textBase" fontWeight="600">
                    8:30 PM
                  </RestyleText>
                  <RestyleText variant="caption" color="neutral600">
                    Fri, 12 Feb
                  </RestyleText>
                  <RestyleText variant="caption" color="neutral600">
                    Heathrow Airport (LHR)
                  </RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Flight Services Section */}
          <Box borderWidth={1} borderColor="neutral300" borderRadius={8} padding="medium">
            <RestyleText variant="h2" fontWeight="600" marginBottom="small">
              Flight Services
            </RestyleText>
            <Box flexDirection="row" flexWrap="wrap">
              {[
                "Meals Included",
                "WiFi Available",
                "Entertainment",
                "Power Outlets",
                "Baggage Included",
                "Seat Selection",
              ].map((service, index) => (
                <Box
                  key={index}
                  backgroundColor="primary50"
                  borderRadius={4}
                  padding="small"
                  marginRight="small"
                  marginBottom="small">
                  <RestyleText variant="caption">{service}</RestyleText>
                </Box>
              ))}
            </Box>
          </Box>
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
  planeIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  planeIconRotated: {
    width: 24,
    height: 24,
    marginRight: 8,
    transform: [{ rotate: "180deg" }],
  },
});
