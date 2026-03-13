import React from "react";
import { StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { getStatusColor } from "@/utils/styles";
import { Baggage } from "@/@types/auth.type";
import { TravelDocument } from "@/@types/profile.type";

interface DocumentItemProps {
  item: TravelDocument;
  index: number;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ item, index }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: index * 100 }}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
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
          <RestyleText
            variant="searchHotelTitle"
            fontFamily={typography.poppinsSemibold}
            color="neutral700"
            marginBottom="tiny">
            {item.name}
          </RestyleText>
          <RestyleText
            variant="caption"
            fontFamily={typography.poppinsRegular}
            color="neutral500"
            marginBottom="tiny">
            {item.description}
          </RestyleText>
          {item.expiryDate && (
            <Box flexDirection="row" alignItems="center">
              <Ionicons name="calendar-outline" size={12} color={colors.neutral400} />
              <RestyleText variant="caption" color="neutral400" marginLeft="tiny">
                Expires: {item.expiryDate?.toLocaleDateString()}
              </RestyleText>
            </Box>
          )}
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
              color: getStatusColor(item.status),
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

export default DocumentItem;
