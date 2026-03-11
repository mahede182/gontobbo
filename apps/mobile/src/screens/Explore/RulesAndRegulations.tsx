// RulesAndRegulations.tsx
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import BulletPoint from "./component/BulletPoint";
import HeaderTitle from "@/components/HeaderTitle";
import { Divider } from "./component/Divider";

const RulesAndRegulations = () => {
  return (
    <ScrollView style={styles.container}>
      <HeaderTitle title="Rules & Regulation" />

      {/* Check In/Out Section */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>Check In/Out</RestyleText>
        <BulletPoint
          text="Hotel Check In time is 2:00 PM, Check Out time 12:00 PM"
          style={styles.sectionDescription}
        />
      </Box>
      <Divider />

      {/* Must Read Section */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>Must Read</RestyleText>
        <BulletPoint text="Pets not allowed." style={styles.sectionDescription} />
        <BulletPoint
          text="Guests are provided with free hand sanitizer. Protective clothing is available to guests. Masks are available to guests."
          style={styles.sectionDescription}
        />
        <BulletPoint
          text="This hotel offers transfers from this airport (surcharges may apply). Guests must contact the hotel with arrival details before travel, using the contact information on the booking confirmation. Front desk staff will greet guests on arrival."
          style={styles.sectionDescription}
        />
        <BulletPoint
          text="Optional: Fee for the buffet breakfast: approximately $20 and $14 for children | Airport shuttle fee : $10 per person (one-way)"
          style={styles.sectionDescription}
        />
      </Box>
      <Divider />

      {/* Safety & Hygiene Section */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>Safety & Hygiene</RestyleText>
        <BulletPoint
          text="Guests are provided with free hand sanitizer. Protective clothing is available to guests. Masks are available to guests."
          style={styles.sectionDescription}
        />
        <BulletPoint
          text="This hotel and its staff is implementing rigorous health & safety measure guidelines."
          style={styles.sectionDescription}
        />
      </Box>
      <Divider />

      {/* Guest Profile Section */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>Guest Profile</RestyleText>
        <BulletPoint
          text="Minimum age for guest to check-in is 18 years."
          style={styles.sectionDescription}
        />
        <BulletPoint
          text="A gap period of at least 24 hours is enforced between guest stays."
          style={styles.sectionDescription}
        />
      </Box>
      <Divider />

      {/* Food & Drinks Hygiene Section */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>Food & Drinks Hygiene</RestyleText>
        <BulletPoint
          text="Individually-wrapped food options are available through room service. Individually-wrapped food options are available. Social distancing measures are in place throughout the hotel."
          style={styles.sectionDescription}
        />
        <BulletPoint
          text="Hotel staff wears personal protective equipment at all times."
          style={styles.sectionDescription}
        />
      </Box>
      <Divider />

      {/* Room Safety & Hygiene Section */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>Room Safety & Hygiene</RestyleText>
        <BulletPoint
          text="This property is cleaned with disinfectants."
          style={styles.sectionDescription}
        />
      </Box>
      <Divider />

      {/* Pet(s) Related Section */}
      <Box style={styles.section}>
        <RestyleText style={styles.sectionTitle}>Pet(s) Related</RestyleText>
        <BulletPoint text="Pets not allowed." style={styles.sectionDescription} />
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 20,
    color: colors.black100,
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
});

export default RulesAndRegulations;
