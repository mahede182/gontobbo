import React from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import HeaderTitle from "@/components/HeaderTitle";

const paymentMethods = [
  {
    id: 1,
    name: "Credit/Debit Card",
    icon: images.creditCard,
  },
  {
    id: 2,
    name: "PayPal",
    icon: images.applePay,
  },
  {
    id: 3,
    name: "Master Card",
    icon: images.creditCard,
  },
  {
    id: 4,
    name: "Bkash",
    icon: images.applePay,
  },
];

const PaymentMethodScreen: React.FC = () => {
  const renderPaymentMethod = ({ item }: { item: (typeof paymentMethods)[number] }) => (
    <TouchableOpacity style={styles.paymentMethodContainer}>
      <Image source={item.icon} style={styles.paymentMethodIcon} />
      <Text style={styles.paymentMethodName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Payment" />
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethod}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },
  listContainer: {
    padding: 16,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentMethodIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 16,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutral600,
  },
});

export default PaymentMethodScreen;
