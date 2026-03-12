import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/colors";
import Icon from "@expo/vector-icons/FontAwesome5";

const BookingEmptyState: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.iconCircle}>
      <Icon name="suitcase-rolling" size={40} color={colors.primary300} />
    </View>
    <Text style={styles.title}>No Bookings Yet</Text>
    <Text style={styles.subtitle}>Your upcoming trips and hotel stays will appear here.</Text>
  </View>
);

export default BookingEmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    marginTop: 60,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.neutral700,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral500,
    textAlign: "center",
    lineHeight: 22,
  },
});
