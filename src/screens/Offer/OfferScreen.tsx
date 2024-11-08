import { SafeAreaView } from "moti";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import SingleOffer from "./SingleOffer";
import HeaderTitle from "@/components/HeaderTitle";
import { dynamicCSS } from "@/utils/styles";

const OfferScreen: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={dynamicCSS("flex", 1)}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <HeaderTitle title="Offer" />
        <SingleOffer />
        <SingleOffer />
        <SingleOffer />
        <SingleOffer />
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
