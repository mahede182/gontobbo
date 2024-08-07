import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import GradientTitle from "@/components/GradientTitle";
import Icon from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";

const Amenities = () => {
  const navigation = useNavigation();
  return (
    <Box style={styles.container}>
      {/* Header with back button */}
      <Box style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <GradientTitle style={styles.headerText}>Amenities</GradientTitle>
      </Box>

      <Box style={styles.section}>
        {/* === Highligted Amenities === */}
        <RestyleText style={[styles.sectionTitle, { fontSize: 18 }]}>
          Highlighted Amenities
        </RestyleText>
        <Box style={[styles.amenityRow, { marginHorizontal: 16 }]}>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Gym (24-hour)
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Business Centre
            </RestyleText>
          </Box>
        </Box>
        <Box style={styles.separator} />
      </Box>
      {/* === Basic Facilities === */}
      <Box style={styles.section}>
        <RestyleText style={[styles.sectionTitle, { fontSize: 18 }]}>
          Basic Facilities
        </RestyleText>
        <Box style={[styles.amenityRow, { marginHorizontal: 16 }]}>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Laundry Service
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Elevator/Lift
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Ironing Service
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Newspaper
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Free Parking
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Paid Parking - Reservation Required
            </RestyleText>
          </Box>
        </Box>
        <Box style={styles.separator} />
      </Box>
      {/* === Transfer === */}
      <Box style={styles.section}>
        <RestyleText style={[styles.sectionTitle, { fontSize: 18 }]}>
          Transfers
        </RestyleText>
        <Box style={[styles.amenityRow, { marginHorizontal: 16 }]}>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Airport Transfers
            </RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Shuttle Service
            </RestyleText>
          </Box>
        </Box>
        <Box style={styles.separator} />
      </Box>

      <Box style={styles.section}>
        <RestyleText style={[styles.sectionTitle, { fontSize: 18 }]}>
          Payment Services
        </RestyleText>
        <Box style={[styles.amenityRow, { marginHorizontal: 16 }]}>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>ATM</RestyleText>
          </Box>
          <Box style={styles.amenityButton}>
            <RestyleText style={styles.amenityButtonText}>
              Currency Exchange
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
    backgroundColor: "white",
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  amenityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  amenityButton: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityButtonText: {
    fontSize: 14,
  },
  amenityText: {
    fontSize: 14,
    marginRight: 16,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
});

export default Amenities;
