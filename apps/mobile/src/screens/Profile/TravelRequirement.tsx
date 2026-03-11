import React from "react";
import { createBox } from "@shopify/restyle";
import type { Theme } from "@/@types/theme.type";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { ScrollView } from "react-native";
import { SafeAreaView } from "moti";

const Container = createBox<Theme>();

type TravelDocument = {
  id: string;
  type: "passport" | "visa" | "insurance" | "vaccination";
  name: string;
  expiryDate?: Date;
  isRequired: boolean;
  description: string;
  status: "valid" | "expired" | "missing" | "not_required";
};

const DocumentItem = ({ document }: { document: TravelDocument }) => {
  const getStatusColor = (status: TravelDocument["status"]) => {
    switch (status) {
      case "valid":
        return "success";
      case "expired":
        return "danger";
      case "missing":
        return "secondary500";
      default:
        return "neutral600";
    }
  };

  return (
    <Container
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-start"
      padding="medium"
      marginVertical="tiny"
      backgroundColor="white"
      shadowColor="neutral700"
      shadowOpacity={0.1}
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={4}
      elevation={2}>
      <Box flex={1}>
        <RestyleText variant="searchHotelTitle" marginBottom="tiny">
          {document.name}
        </RestyleText>
        <RestyleText variant="caption" color="neutral600" marginBottom="tiny">
          {document.description}
        </RestyleText>
        {document.expiryDate && (
          <RestyleText variant="caption" color="neutral600">
            Expires: {document.expiryDate.toLocaleDateString()}
          </RestyleText>
        )}
      </Box>
      <Box
        backgroundColor={getStatusColor(document.status)}
        paddingHorizontal="small"
        paddingVertical="tiny"
        marginLeft="small"
        minWidth={90}
        alignItems="center">
        <RestyleText variant="caption" style={{ textTransform: "uppercase", color: "white" }}>
          {document.status.replace("_", " ")}
        </RestyleText>
      </Box>
    </Container>
  );
};

const TravelRequirementScreen = () => {
  const [documents] = React.useState<TravelDocument[]>([
    {
      id: "1",
      type: "passport",
      name: "Passport",
      expiryDate: new Date("2025-12-31"),
      isRequired: true,
      description: "International passport with at least 6 months validity",
      status: "valid",
    },
    {
      id: "2",
      type: "visa",
      name: "Tourist Visa",
      isRequired: true,
      description: "Required for entry into destination country",
      status: "missing",
    },
    {
      id: "3",
      type: "insurance",
      name: "Travel Insurance",
      expiryDate: new Date("2023-12-31"),
      isRequired: true,
      description: "International travel health insurance",
      status: "expired",
    },
    {
      id: "4",
      type: "vaccination",
      name: "COVID-19 Vaccination",
      isRequired: false,
      description: "Not mandatory but recommended",
      status: "not_required",
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
      <Container flex={1} backgroundColor="neutral50">
        <HeaderTitle title="Travel Requirements" />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
          <Box paddingVertical="medium">
            {documents.map((doc) => (
              <DocumentItem key={doc.id} document={doc} />
            ))}
          </Box>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default TravelRequirementScreen;
