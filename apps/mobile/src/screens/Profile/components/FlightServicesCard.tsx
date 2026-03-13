import React from "react";
import { Box, RestyleText } from "@/theme";
import { MotiView } from "moti";
import { FLIGHT_SERVICES } from "@/constants/flight";

const FlightServicesCard = () => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 400 }}>
      <Box borderWidth={1} borderColor="neutral300" borderRadius={8} padding="medium">
        <RestyleText variant="h2" fontWeight="600" marginBottom="small">
          Flight Services
        </RestyleText>
        <Box flexDirection="row" flexWrap="wrap">
          {FLIGHT_SERVICES.map((service: string, index: number) => (
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
    </MotiView>
  );
};

export default FlightServicesCard;
