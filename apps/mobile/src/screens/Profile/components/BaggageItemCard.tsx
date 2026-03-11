import React from "react";
import { StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { Baggage } from "@/@types/auth.type";

interface BaggageItemCardProps {
  item: Baggage;
  index: number;
}

const BaggageItemCard: React.FC<BaggageItemCardProps> = ({ item, index }) => {
  const getStatusColor = (status: Baggage["status"]): keyof typeof colors => {
    switch (status) {
      case "INCLUDED":
        return "success";
      case "EXTRA_FEE":
        return "warning";
      case "NOT_ALLOWED":
        return "danger";
      default:
        return "neutral600";
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        padding="medium"
        marginVertical="tiny"
        backgroundColor="white"
        borderRadius={12}
        shadowColor="neutral700"
        shadowOpacity={0.05}
        shadowOffset={{ width: 0, height: 2 }}
        shadowRadius={10}
        elevation={3}
        borderWidth={1}
        borderColor="neutral100">
        <Box flex={1}>
          <Box flexDirection="row" alignItems="center" marginBottom="tiny">
            <Ionicons
              name={item.type === "CABIN" ? "briefcase" : "cube"}
              size={16}
              color={colors.primary700}
            />
            <RestyleText
              variant="searchHotelTitle"
              fontFamily={typography.poppinsSemibold}
              color="neutral700"
              marginLeft="small">
              {item.name}
            </RestyleText>
          </Box>
          {item.description && (
            <RestyleText
              variant="caption"
              color="neutral500"
              marginBottom="tiny"
              fontFamily={typography.poppinsRegular}>
              {item.description}
            </RestyleText>
          )}
          <Box flexDirection="row" gap="medium">
            <RestyleText variant="caption" color="neutral600" fontFamily={typography.poppinsMedium}>
              Weight: {item.weight}
            </RestyleText>
            {item.dimensions && (
              <RestyleText
                variant="caption"
                color="neutral600"
                fontFamily={typography.poppinsMedium}>
                Dim: {item.dimensions}
              </RestyleText>
            )}
          </Box>
        </Box>
        <Box
          backgroundColor="white"
          paddingHorizontal="small"
          paddingVertical="tiny"
          marginLeft="small"
          borderRadius={20}
          borderWidth={1}
          borderColor={getStatusColor(item.status)}
          minWidth={100}
          alignItems="center">
          <RestyleText
            variant="caption"
            style={{
              textTransform: "uppercase",
              color: colors[getStatusColor(item.status)],
              fontWeight: "700",
              fontSize: 10,
            }}>
            {item.status.replace("_", " ")}
          </RestyleText>
        </Box>
      </Box>
    </MotiView>
  );
};

export default BaggageItemCard;
