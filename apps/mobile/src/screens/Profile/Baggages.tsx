import React from "react";
import { createBox } from "@shopify/restyle";
import { Theme } from "@/theme";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { ScrollView } from "react-native";
import { SafeAreaView } from "moti";

const Container = createBox<Theme>();

type BaggageItem = {
  id: string;
  type: "cabin" | "checked" | "special";
  name: string;
  description: string;
  weight: string;
  dimensions?: string;
  status: "included" | "extra_fee" | "not_allowed";
};

const BaggageItemCard = ({ item }: { item: BaggageItem }) => {
  const getStatusColor = (status: BaggageItem["status"]) => {
    switch (status) {
      case "included":
        return "success";
      case "extra_fee":
        return "warning";
      case "not_allowed":
        return "danger";
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
      borderRadius="medium"
      shadowColor="neutral700"
      shadowOpacity={0.1}
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={4}
      elevation={2}>
      <Box flex={1}>
        <RestyleText variant="searchHotelTitle" marginBottom="tiny">
          {item.name}
        </RestyleText>
        <RestyleText variant="caption" color="neutral600" marginBottom="tiny">
          {item.description}
        </RestyleText>
        <RestyleText variant="caption" color="neutral600" marginBottom="tiny">
          Weight: {item.weight}
        </RestyleText>
        {item.dimensions && (
          <RestyleText variant="caption" color="neutral600">
            Dimensions: {item.dimensions}
          </RestyleText>
        )}
      </Box>
      <Box
        backgroundColor={getStatusColor(item.status)}
        paddingHorizontal="small"
        paddingVertical="tiny"
        borderRadius="small"
        marginLeft="small"
        minWidth={90}
        alignItems="center">
        <RestyleText variant="caption" style={{ textTransform: "uppercase", color: "white" }}>
          {item.status.replace("_", " ")}
        </RestyleText>
      </Box>
    </Container>
  );
};

const BaggagesScreen = () => {
  const [baggageItems] = React.useState<BaggageItem[]>([
    {
      id: "1",
      type: "cabin",
      name: "Cabin Baggage",
      description: "Small bag that fits under the seat",
      weight: "7 kg",
      dimensions: "40 x 30 x 20 cm",
      status: "included",
    },
    {
      id: "2",
      type: "checked",
      name: "Checked Baggage",
      description: "Standard checked baggage",
      weight: "23 kg",
      dimensions: "90 x 75 x 43 cm",
      status: "extra_fee",
    },
    {
      id: "3",
      type: "special",
      name: "Sports Equipment",
      description: "Golf clubs, skis, or similar",
      weight: "Up to 32 kg",
      status: "extra_fee",
    },
    {
      id: "4",
      type: "special",
      name: "Dangerous Items",
      description: "Flammable materials, weapons",
      status: "not_allowed",
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
      <Container flex={1} backgroundColor="neutral50">
        <HeaderTitle title="Baggage Information" />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
          <Box paddingVertical="medium">
            {baggageItems.map((item) => (
              <BaggageItemCard key={item.id} item={item} />
            ))}
          </Box>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default BaggagesScreen;
