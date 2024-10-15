import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import GradientTitle from "@/components/GradientTitle";
import Icon from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Amenities = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Box style={styles.container}>
      {/* Header with back button */}
      <Box style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.black100} />
        </TouchableOpacity>
        <GradientTitle style={styles.headerText}>{t("Explore.amenities")}</GradientTitle>
      </Box>

      <Box style={styles.section}>
        {/* === Highligted Amenities === */}
        <RestyleText style={styles.sectionTitle}>{t("Explore.highlightedAmenities")}</RestyleText>
        <Box style={styles.amenityRow}>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>{t("Explore.gym")}</RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              {t("Explore.businessCentre")}
            </RestyleText>
          </Box>
        </Box>
        <Box style={styles.separator} />
      </Box>
      {/* === Basic Facilities === */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>{t("Explore.basicFacilities")}</RestyleText>
        <Box style={styles.amenityRow}>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              {t("Explore.laundryService")}
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>{t("Explore.elevator")}</RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              {t("Explore.ironingService")}
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>{t("Explore.newspaper")}</RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>{t("Explore.freeParking")}</RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>{t("Explore.paidParking")}</RestyleText>
          </Box>
        </Box>
        <Box style={styles.separator} />
      </Box>
      {/* === Transfer === */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>{t("Explore.transfers")}</RestyleText>
        <Box style={styles.amenityRow}>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              {t("Explore.airportTransfers")}
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              {t("Explore.shuttleService")}
            </RestyleText>
          </Box>
        </Box>
        <Box style={styles.separator} />
      </Box>

      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>{t("Explore.paymentServices")}</RestyleText>
        <Box style={styles.amenityRow}>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>{t("Explore.atm")}</RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              {t("Explore.currencyExchange")}
            </RestyleText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  amenityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    marginHorizontal: 16,
  },
  amenityButton: {
    backgroundColor: colors.neutral400,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityButtonText: {
    fontSize: 14,
  },

  separator: {
    height: 1,
    backgroundColor: colors.white200,
    marginVertical: 8,
  },
});

export default Amenities;
