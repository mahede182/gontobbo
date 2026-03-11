import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { images } from "@/theme/images";
import { MotiView } from "moti";

const FlightDetailsCard = () => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 200 }}>
      <Box
        borderWidth={1}
        borderColor="neutral200"
        borderRadius={15}
        padding="medium"
        marginBottom="medium"
        backgroundColor="white"
        shadowColor="neutral700"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={10}
        elevation={4}>
        <RestyleText
          variant="h2"
          fontFamily={typography.poppinsSemibold}
          color="neutral700"
          marginBottom="medium">
          Flight Details
        </RestyleText>

        <Box marginBottom="medium">
          <RestyleText variant="caption" color="neutral500" fontFamily={typography.poppinsMedium}>
            Departure
          </RestyleText>
          <Box flexDirection="row" alignItems="center" marginTop="small">
            <View style={styles.iconCircle}>
              <Image source={images.plane} style={styles.planeIcon} />
            </View>
            <Box>
              <RestyleText
                variant="textBase"
                fontFamily={typography.poppinsSemibold}
                color="neutral700">
                10:30 AM
              </RestyleText>
              <RestyleText variant="caption" color="neutral500">
                Thu, 11 Feb • JFK International
              </RestyleText>
            </Box>
          </Box>
        </Box>

        <View style={styles.journeyLine}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={[styles.dot, { backgroundColor: colors.secondary400 }]} />
        </View>

        <Box marginVertical="small" alignItems="center">
          <RestyleText variant="caption" color="primary700" fontWeight="bold">
            14h 0m • 1 STOP
          </RestyleText>
          <RestyleText variant="caption" color="neutral500">
            Dubai (DXB)
          </RestyleText>
        </Box>

        <View style={styles.journeyLine}>
          <View style={[styles.dot, { backgroundColor: colors.secondary400 }]} />
          <View style={styles.line} />
          <View style={[styles.dot, { backgroundColor: colors.primary700 }]} />
        </View>

        <Box marginTop="medium">
          <RestyleText variant="caption" color="neutral500" fontFamily={typography.poppinsMedium}>
            Arrival
          </RestyleText>
          <Box flexDirection="row" alignItems="center" marginTop="small">
            <View style={[styles.iconCircle, { backgroundColor: colors.secondary50 }]}>
              <Image source={images.plane} style={styles.planeIconRotated} />
            </View>
            <Box>
              <RestyleText
                variant="textBase"
                fontFamily={typography.poppinsSemibold}
                color="neutral700">
                8:30 PM
              </RestyleText>
              <RestyleText variant="caption" color="neutral500">
                Fri, 12 Feb • Heathrow (LHR)
              </RestyleText>
            </Box>
          </Box>
        </Box>
      </Box>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  planeIcon: {
    width: 20,
    height: 20,
    tintColor: colors.primary700,
  },
  planeIconRotated: {
    width: 20,
    height: 20,
    tintColor: colors.secondary600,
    transform: [{ rotate: "180deg" }],
  },
  journeyLine: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    marginVertical: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary700,
  },
  line: {
    width: 1,
    height: 30,
    backgroundColor: colors.neutral200,
    marginLeft: -3.5,
  },
});

export default FlightDetailsCard;
