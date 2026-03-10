import { SafeAreaView } from "moti";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import SingleOffer from "./SingleOffer";
import HeaderTitle from "@/components/HeaderTitle";
import { dynamicCSS } from "@/utils/styles";
import { getOffers, Offer } from "@/api/offers";
import { colors } from "@/theme/colors";

const OfferScreen: React.FC = (): JSX.Element => {
  const [offers, setOffers] = React.useState<Offer[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffers();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={[dynamicCSS("flex", 1), { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={dynamicCSS("flex", 1)}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <HeaderTitle title="Offer" />
        {offers.map((offer) => (
          <SingleOffer key={offer.id} offer={offer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OfferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});
