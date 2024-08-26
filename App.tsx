import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import theme from "./src/theme";
import { ThemeProvider as RestyleProvider } from "@shopify/restyle";
import "react-native-reanimated";
import RootNavigation from "./src/navigation/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { customFontsToLoad } from "./src/theme/typography";
import { useFonts } from "expo-font";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { dynamicCSS } from "@/utils/styles";

interface AppProps {
  hideSplashScreen: () => Promise<void>;
}

/**
 * This is the root component of our app.
 */
export default function App(props: AppProps) {
  const [areFontsLoaded] = useFonts(customFontsToLoad);

  // Before we show the app, we have to wait for our state to be ready.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!areFontsLoaded) return null;

  // otherwise, we're ready to render the app
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={dynamicCSS("flex", 1)}>
        <RestyleProvider theme={theme}>
          <I18nextProvider i18n={i18next}>
            <RootNavigation />
          </I18nextProvider>
        </RestyleProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
