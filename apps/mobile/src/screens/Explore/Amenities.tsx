import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import GradientTitle from "@/components/GradientTitle";
import Icon from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getHotelAmenities, Amenity } from "@/api/hotels";

const Amenities = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId } = (route.params as { hotelId: string }) || {};
  const { t } = useTranslation();
  const [amenities, setAmenities] = React.useState<Amenity[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const data = await getHotelAmenities(hotelId);
        setAmenities(data);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      } finally {
        setLoading(false);
      }
    };
    if (hotelId) fetchAmenities();
    else setLoading(false);
  }, [hotelId]);

  const grouped = amenities.reduce<Record<string, Amenity[]>>((acc, item) => {
    const cat = "Amenities";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <Box style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.black100} />
        </TouchableOpacity>
        <GradientTitle style={styles.headerText}>{t("Explore.amenities")}</GradientTitle>
      </Box>

      {Object.entries(grouped).map(([category, items]) => (
        <Box key={category} style={styles.section}>
          <RestyleText style={styles.sectionTitle}>{category}</RestyleText>
          <Box style={styles.amenityRow}>
            {items.map((item) => (
              <Box key={item.id} style={styles.amenityButton}>
                <RestyleText style={styles.amenityButtonText}>{item.name}</RestyleText>
              </Box>
            ))}
          </Box>
          <Box style={styles.separator} />
        </Box>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
    marginHorizontal: 20,
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
