import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { useTranslation } from "react-i18next";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { QuickActionsProps } from "@/@types/profile.type";

const QuickActions: React.FC<QuickActionsProps> = ({ provider, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 500 }}
      style={styles.detailsContainer}>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsLabel}>{t("Profile.signInProvider")}</Text>
        <Text style={styles.detailsValue}>{provider}</Text>
      </View>
      <TouchableOpacity style={styles.detailsRow} onPress={() => onNavigate("MEMBER_CARD")}>
        <Text style={styles.detailsLabel}>{t("Profile.memberCard")}</Text>
        <Image style={styles.detailsIcon} source={images.rightArrow} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.detailsRow, styles.detailsRowLast]}
        onPress={() => onNavigate("WISH_LIST")}>
        <Text style={styles.detailsLabel}>{t("Profile.wishList")}</Text>
        <Image style={styles.detailsIcon} source={images.rightArrow} />
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: -60,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: colors.neutral700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  detailsRowLast: {
    borderBottomWidth: 0,
  },
  detailsLabel: {
    fontSize: 16,
    color: colors.neutral700,
    fontWeight: "600",
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsIcon: {
    height: 16,
    width: 16,
    tintColor: colors.primary700,
  },
});

export default QuickActions;
