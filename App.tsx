import { SafeAreaView, StyleSheet } from "react-native";
import theme from "./src/theme";
import { ThemeProvider as RestyleProvider } from "@shopify/restyle";
import "./src/localization/i18n";
import "react-native-reanimated";

import LocalizationTest from "./src/LocalizationTest";
import RootNavigation from "./src/navigation/RootNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RestyleProvider theme={theme}>
        <RootNavigation />
      </RestyleProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lang: {
    width: 365,
    left: 20,
    backgroundColor: "#FFFFFF",
    // border: 1px solid #E9EDF2;
    borderWidth: 1,
    borderColor: "#E9EDF2",
    borderRadius: 16,
    borderStyle: "solid",
  },
  sTitle1: {
    paddingTop: 34,
    fontFamily: "Manrope",
    fontStyle: "normal",

    paddingLeft: 30,
    fontSize: 14,
    color: "#A8B4BF",
  },
  sTitle2: {
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: "Manrope",
    fontStyle: "normal",
    paddingLeft: 30,
    fontSize: 12,

    color: "#576573",
  },
  languageItem: {
    height: 50,

    top: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
  },
  texts: {
    fontFamily: "Manrope",
    fontStyle: "normal",
    color: "#576573",

    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
  btns: {
    flexDirection: "row",

    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  language: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedLanguage: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#eee",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 14,
    color: "#576573",
  },
  selectedText: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
});
