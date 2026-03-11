import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";

export type PaymentMethod = {
  id: number;
  name: string;
  icon: any;
  type: string;
};

interface PaymentMethodItemProps {
  item: PaymentMethod;
  index: number;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ item, index }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: 100 + index * 100 }}>
      <TouchableOpacity style={styles.paymentMethodContainer}>
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.paymentMethodIcon} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.paymentMethodName}>{item.name}</Text>
          <Text style={styles.paymentMethodType}>{item.type}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.neutral400} />
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.neutral700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  paymentMethodIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontFamily: typography.poppinsSemibold,
    color: colors.neutral700,
  },
  paymentMethodType: {
    fontSize: 12,
    fontFamily: typography.poppinsRegular,
    color: colors.neutral500,
    marginTop: 2,
  },
});

export default PaymentMethodItem;
