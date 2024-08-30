/* eslint-disable react-hooks/exhaustive-deps */
import GradientTitle from "@/components/GradientTitle";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Animated, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const GuestModal = ({ isVisible, onClose }) => {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [modalAnimation] = useState(new Animated.Value(0));

  const openModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const handleRoomsChange = (value) => {
    setRooms(Math.max(rooms + value, 1));
  };

  const handleAdultsChange = (value) => {
    setAdults(Math.max(adults + value, 1));
  };

  const handleChildrenChange = (value) => {
    setChildren(Math.max(children + value, 0));
  };

  React.useEffect(() => {
    if (isVisible) {
      openModal();
    } else {
      closeModal();
    }
  }, [isVisible]);

  const modalTranslateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [800, 0],
  });

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <Animated.View style={styles.animatedViewContainer(modalTranslateY)}>
        <View
          style={{
            backgroundColor: colors.white100,
            padding: 16,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 5,
              alignItems: "center",
              marginBottom: 16,
            }}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ marginRight: 10, fontSize: 16, color: colors.black100 }}>X</Text>
            </TouchableOpacity>
            <GradientTitle variant="gradientTitle">
              {t("Explore.selectRoomsAndGuests")}
            </GradientTitle>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}>
            <Text style={{ fontFamily: typography.poppinsSemibold, fontSize: 16 }}>
              {t("Explore.rooms")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => handleRoomsChange(-1)} disabled={rooms === 1}>
                <Text
                  style={{
                    fontSize: 24,
                    color: rooms === 1 ? colors.neutral50 : colors.black100,
                  }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, marginHorizontal: 8 }}>{rooms}</Text>
              <TouchableOpacity onPress={() => handleRoomsChange(1)}>
                <Text style={{ fontSize: 24, color: colors.black100 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}>
            <Text style={{ fontFamily: typography.poppinsSemibold, fontSize: 16 }}>
              {t("Explore.adults")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => handleAdultsChange(-1)} disabled={adults === 1}>
                <Text
                  style={{
                    fontSize: 24,
                    color: adults === 1 ? colors.neutral700 : colors.black100,
                  }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, marginHorizontal: 8 }}>{adults}</Text>
              <TouchableOpacity onPress={() => handleAdultsChange(1)}>
                <Text style={{ fontSize: 24, color: colors.black100 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text style={{ fontFamily: typography.poppinsSemibold, fontSize: 16 }}>
              {t("Explore.children")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => handleChildrenChange(-1)} disabled={children === 0}>
                <Text
                  style={{
                    fontSize: 24,
                    color: children === 0 ? colors.neutral700 : colors.black100,
                  }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, marginHorizontal: 8 }}>{children}</Text>
              <TouchableOpacity onPress={() => handleChildrenChange(1)}>
                <Text style={{ fontSize: 24, color: colors.black100 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.blue800,
              padding: 12,
              borderRadius: 8,
              marginVertical: 16,
            }}
            onPress={onClose}>
            <Text
              style={{
                fontFamily: typography.poppinsBold,
                color: colors.white100,
                fontSize: 16,
                textAlign: "center",
              }}>
              {t("common.done")}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default GuestModal;

const styles = StyleSheet.create({
  animatedViewContainer: (modalTranslateY) => ({
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    transform: [{ translateY: modalTranslateY }],
  }),
});
