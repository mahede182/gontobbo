import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import theme from "./src/theme";
import { ThemeProvider as RestyleProvider } from "@shopify/restyle";
import "./src/localization/i18n";
import "react-native-reanimated";
import RootNavigation from "./src/navigation/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { customFontsToLoad } from "./src/theme/typography";
import { useFonts } from "expo-font";

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RestyleProvider theme={theme}>
          <RootNavigation />
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
