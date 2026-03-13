import { Baggage } from "@/@types/auth.type";
import { colors } from "@/theme/colors";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

export const utilityStyles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export const dynamicSpace = (value: number) => {
  return StyleSheet.create({
    marginTop: { marginTop: value },
    marginLeft: { marginLeft: value },
    flex: { flex: value },
    borderTopWidth: { borderTopWidth: value },
    width: { width: value },
    height: { height: value },
    fontSize: { fontSize: value },
    paddingRight: { paddingRight: value },
  });
};

export const getStatusColor = (status: Baggage["status"]): keyof typeof colors => {
  switch (status) {
    case "INCLUDED":
      return "success";
    case "EXTRA_FEE":
      return "warning";
    case "NOT_ALLOWED":
      return "danger";
    case "VALID":
      return "success";
    case "EXPIRED":
      return "danger";
    case "MISSING":
      return "secondary500";
    default:
      return "neutral600";
  }
};

type AllStyles = ViewStyle & TextStyle & ImageStyle;
type StylePropKey = keyof AllStyles;

export function dynamicCss<K extends StylePropKey>(key: K, value: AllStyles[K]) {
  return { [key]: value } as any;
}

export const dynamicCSS = dynamicCss;
