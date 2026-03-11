import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import HeaderTitle from "@/components/HeaderTitle";
import PaymentMethodItem, { PaymentMethod } from "./components/PaymentMethodItem";

const paymentMethods: PaymentMethod[] = [
  { id: 1, name: "Credit/Debit Card", icon: images.creditCard, type: "Card" },
  { id: 2, name: "PayPal", icon: images.applePay, type: "Wallet" },
  { id: 3, name: "Master Card", icon: images.creditCard, type: "Card" },
  { id: 4, name: "Bkash", icon: images.applePay, type: "Mobile" },
];

const PaymentMethodScreen: React.FC = () => {
  const renderPaymentMethod = ({ item, index }: { item: PaymentMethod; index: number }) => (
    <PaymentMethodItem item={item} index={index} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Payment Methods" />
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethod}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  listContainer: {
    padding: 20,
  },
});

export default PaymentMethodScreen;
