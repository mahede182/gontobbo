import { Dimensions, StyleSheet, ViewStyle } from "react-native";

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

type StylePropKey = keyof ViewStyle;

export function dynamicCSS<K extends StylePropKey>(
  key: K,
  value: ViewStyle[K]
) {
  return { [key]: value };
}
