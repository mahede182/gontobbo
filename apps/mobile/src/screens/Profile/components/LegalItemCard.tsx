import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { LegalItemCardProps } from "@/@types/profile.type";

const LegalItemCard: React.FC<LegalItemCardProps> = ({ item, index, onPress }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}>
      <TouchableOpacity style={styles.legalItem} onPress={onPress}>
        <Box flexDirection="row" alignItems="center">
          <View style={styles.iconContainer}>
            <Ionicons
              name={
                item.type === "terms"
                  ? "document-text-outline"
                  : item.type === "policy"
                    ? "shield-checkmark-outline"
                    : "information-circle-outline"
              }
              size={20}
              color={colors.primary700}
            />
          </View>
          <Box marginLeft="medium" flex={1}>
            <RestyleText
              variant="textBase"
              fontFamily={typography.poppinsMedium}
              color="neutral700">
              {item.title}
            </RestyleText>
            <RestyleText
              variant="caption"
              color="neutral500"
              fontFamily={typography.poppinsRegular}>
              Last Updated: {item.lastUpdated}
            </RestyleText>
          </Box>
        </Box>
        <Ionicons name="chevron-forward" size={18} color={colors.neutral400} />
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  legalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.neutral700,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.neutral100,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LegalItemCard;
