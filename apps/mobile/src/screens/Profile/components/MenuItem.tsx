import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { images } from "@/theme/images";
import { MenuItemProps } from "@/@types/profile.type";

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  onPress,
  showArrow = true,
  value,
  valueStyle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.sectionItem, containerStyle]} onPress={onPress}>
      {icon && <Image style={styles.sectionItemIcon} source={icon} />}
      <Text style={styles.sectionItemText}>{label}</Text>
      {value && <Text style={[styles.detailsValue, valueStyle]}>{value}</Text>}
      {showArrow && <Image style={styles.detailsIcon} source={images.rightArrow} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  sectionItemIcon: {
    height: 24,
    width: 24,
    marginRight: 10,
    tintColor: colors.primary700,
    resizeMode: "center",
  },
  sectionItemText: {
    fontSize: 16,
    flex: 1,
    color: colors.neutral700,
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  detailsIcon: {
    height: 16,
    width: 16,
    tintColor: colors.primary700,
  },
});

export default MenuItem;
