import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/theme/colors";
import { Box, RestyleText } from "@/theme";
import GradientTitle from "@/components/GradientTitle";

type Props = {
  gradient?: boolean;
  type?: "select" | "booking";
  price: number;
  priceSub: "string";
  buttonText: "string";
};

const PriceSelect = (props: Props) => {
  return (
    <Box style={styles.priceSection}>
      <Box style={styles.priceContainer}>
        {props.gradient ? (
          <>
            <GradientTitle style={styles.gradientTitle}>
              {`$ ${props.price}`}
            </GradientTitle>
            <GradientTitle style={{ width: "60%" }}>
              {props.priceSub}
            </GradientTitle>
          </>
        ) : (
          <>
            <RestyleText style={styles.gradientTitle}>
              {`$ ${props.price}`}
            </RestyleText>
            <RestyleText style={{ width: "60%" }}>{props.priceSub}</RestyleText>
          </>
        )}
      </Box>
      <TouchableOpacity style={styles.selectRoomButton}>
        <RestyleText style={styles.selectRoomButtonText}>
          {props.buttonText}
        </RestyleText>
      </TouchableOpacity>
    </Box>
  );
};

export default PriceSelect;

const styles = StyleSheet.create({
  priceSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  priceContainer: {
    width: "60%",
    borderRadius: 8,
    padding: 8,
  },
  gradientTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  selectRoomButton: {
    backgroundColor: colors.blue800,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectRoomButtonText: {
    color: colors.white100,
    fontWeight: "bold",
  },
});
