import { SafeAreaView } from "moti";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import SingleOffer from "./SingleOffer";
import HeaderTitle from "@/components/HeaderTitle";
import { dynamicCSS } from "@/utils/styles";
import { images } from "@/theme/images";
// Dummy data for offers
const offers = [
  {
    id: 1,
    itemId: "offer_1", // this is unique for each
    name: "Caesars Palace",
    location: "Las Vegas | United States",
    image: images.dummyCard,
    offer1: {
      title: "Offer #1",
      subtitle: "Valid for December 24",
      value: "$25 Value",
      discount: "75% Off",
      price: 10,
    },
    offer2: {
      title: "Offer #2",
      subtitle: "Valid for December 25",
      value: "$50 Value",
      discount: "50% Off",
      price: 25,
    },
  },
  {
    id: 2,
    itemId: "offer_2", // this is unique for each
    name: "The Venetian Resort",
    location: "Las Vegas | United States",
    image: images.dummyTri2,
    offer1: {
      title: "Offer #1",
      subtitle: "Valid for December 26",
      value: "$30 Value",
      discount: "60% Off",
      price: 12,
    },
    offer2: {
      title: "Offer #2",
      subtitle: "Valid for December 27",
      value: "$75 Value",
      discount: "40% Off",
      price: 45,
    },
  },
  {
    id: 3,
    itemId: "offer_3", // this is unique for each
    name: "MGM Grand",
    location: "Las Vegas | United States",
    image: images.dummyTrip1,
    offer1: {
      title: "Offer #1",
      subtitle: "Valid for December 28",
      value: "$40 Value",
      discount: "70% Off",
      price: 12,
    },
    offer2: {
      title: "Offer #2",
      subtitle: "Valid for December 29",
      value: "$60 Value",
      discount: "55% Off",
      price: 27,
    },
  },
  {
    id: 4,
    itemId: "offer_4", // this is unique for each
    name: "Bellagio",
    location: "Las Vegas | United States",
    image: images.dummyCard,
    offer1: {
      title: "Offer #1",
      subtitle: "Valid for December 30",
      value: "$80 Value",
      discount: "65% Off",
      price: 28,
    },
    offer2: {
      title: "Offer #2",
      subtitle: "Valid for December 31",
      value: "$100 Value",
      discount: "45% Off",
      price: 55,
    },
  },
];

const OfferScreen: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={dynamicCSS("flex", 1)}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <HeaderTitle title="Offer" />
        {/* Assuming you have an array of offers called 'offers' */}
        {offers.map((offer, index) => (
          <SingleOffer key={index} offer={offer} />
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
