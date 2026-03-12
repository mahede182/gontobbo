import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { colors } from "@/theme/colors";
import { TABS } from "@/constants/booking";

export type BookingTypeFilter = "ALL" | "HOTEL" | "TRIP";

interface Props {
  active: BookingTypeFilter;
  onChange: (type: BookingTypeFilter) => void;
}

const BookingFilterTabs: React.FC<Props> = ({ active, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}>
    {TABS.map(({ key, label }) => {
      const isActive = active === key;
      return (
        <TouchableOpacity key={key} onPress={() => onChange(key)} style={styles.tab}>
          {isActive ? (
            <MaskedView
              maskElement={<Text style={[styles.label, styles.activeLabel]}>{label}</Text>}>
              <LinearGradient
                colors={[colors.linearStart, colors.linearEnd]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={[styles.label, styles.activeLabel, { opacity: 0 }]}>{label}</Text>
              </LinearGradient>
            </MaskedView>
          ) : (
            <Text style={[styles.label, styles.inactiveLabel]}>{label}</Text>
          )}
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

export default BookingFilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 8,
  },
  tab: {
    alignItems: "center",
    paddingHorizontal: 16,
    // paddingVertical: 10,
    position: "relative",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeLabel: {
    fontWeight: "700",
  },
  inactiveLabel: {
    color: colors.neutral500,
  },
});
