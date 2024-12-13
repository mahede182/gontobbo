import React from "react";
import { createBox } from "@shopify/restyle";
import { Theme } from "@/theme";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "moti";
import { Ionicons } from "@expo/vector-icons";

const Container = createBox<Theme>();

type LegalDocument = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  type: "policy" | "terms" | "guidelines" | "licenses";
};

const LegalItemCard = ({ item, onPress }: { item: LegalDocument; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="medium"
        marginVertical="tiny"
        backgroundColor="white"
        borderRadius="medium"
        shadowColor="neutral700"
        shadowOpacity={0.1}
        shadowOffset={{ width: 0, height: 2 }}
        shadowRadius={4}
        elevation={2}>
        <Box flex={1}>
          <RestyleText variant="searchHotelTitle" marginBottom="tiny">
            {item.title}
          </RestyleText>
          <RestyleText variant="caption" color="neutral600" marginBottom="tiny">
            {item.description}
          </RestyleText>
          <RestyleText variant="caption" color="neutral600">
            Last Updated: {item.lastUpdated}
          </RestyleText>
        </Box>
        <Box marginLeft="small">
          <Ionicons name="chevron-forward" size={24} color="#4B4B4B" />
        </Box>
      </Container>
    </TouchableOpacity>
  );
};

const LegalScreen = () => {
  const [legalDocuments] = React.useState<LegalDocument[]>([
    {
      id: "1",
      type: "terms",
      title: "Terms of Service",
      description: "Terms and conditions for using our services",
      lastUpdated: "Jan 15, 2024",
    },
    {
      id: "2",
      type: "policy",
      title: "Privacy Policy",
      description: "How we collect, use, and protect your data",
      lastUpdated: "Jan 10, 2024",
    },
    {
      id: "3",
      type: "guidelines",
      title: "Booking Guidelines",
      description: "Rules and policies for flight bookings",
      lastUpdated: "Dec 20, 2023",
    },
    {
      id: "4",
      type: "policy",
      title: "Refund Policy",
      description: "Terms and conditions for refunds and cancellations",
      lastUpdated: "Dec 15, 2023",
    },
    {
      id: "5",
      type: "licenses",
      title: "Licenses & Certifications",
      description: "Our operational licenses and certifications",
      lastUpdated: "Nov 30, 2023",
    },
  ]);

  const handleDocumentPress = (documentId: string) => {
    // Handle document press - navigate to document detail screen
    console.log("Document pressed:", documentId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container flex={1} backgroundColor="neutral50">
        <HeaderTitle title="Legal Information" />
        <ScrollView style={styles.scrollView}>
          <Box paddingVertical="medium">
            {legalDocuments.map((item) => (
              <LegalItemCard
                key={item.id}
                item={item}
                onPress={() => handleDocumentPress(item.id)}
              />
            ))}
          </Box>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
});

export default LegalScreen; 