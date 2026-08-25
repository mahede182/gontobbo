import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "moti";
import { colors } from "@/theme/colors";
import HeaderTitle from "@/components/HeaderTitle";
import PaymentMethodItem from "./components/PaymentMethodItem";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";
import { PaymentMethod } from "@/@types/profile.type";

const PaymentMethodScreen: React.FC = () => {
  const renderPaymentMethod = ({ item, index }: { item: PaymentMethod; index: number }) => (
    <PaymentMethodItem item={item} index={index} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Payment Methods" />
      <FlatList
        data={PAYMENT_METHODS}
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
