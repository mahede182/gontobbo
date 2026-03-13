import React from "react";
import { View, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MotiView } from "moti";

const FlightStatusCard = () => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 500 }}>
      <Box
        borderWidth={1}
        borderColor="neutral200"
        borderRadius={15}
        padding="medium"
        marginBottom="medium"
        backgroundColor="blue100"
        shadowColor="neutral700"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.05}
        shadowRadius={10}
        elevation={2}>
        <RestyleText
          variant="h2"
          fontFamily={typography.poppinsSemibold}
          color="neutral700"
          marginBottom="small">
          Flight Status
        </RestyleText>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <View style={styles.statusBadge}>
            <RestyleText variant="caption" color="white" fontWeight="bold">
              ON TIME
            </RestyleText>
          </View>
          <RestyleText variant="textBase" fontFamily={typography.poppinsMedium}>
            Flight: AA 1234
          </RestyleText>
        </Box>
      </Box>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  statusBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
});

export default FlightStatusCard;
