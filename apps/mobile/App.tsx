import React, { useEffect } from "react";
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
import { Provider } from "react-redux";
import { store } from "@/store/store";

import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";

interface AppProps {
  hideSplashScreen: () => Promise<void>;
}

/**
 * This is the root component of our app.
 */
export default function App(props: AppProps) {
  const [areFontsLoaded] = useFonts(customFontsToLoad);

  if (!areFontsLoaded) return null;

  return (
    <Provider store={store}>
      <KeyboardProvider>
        <GestureHandlerRootView style={dynamicCSS("flex", 1)}>
          <RestyleProvider theme={theme}>
            <I18nextProvider i18n={i18next}>
              <RootNavigation />
              <Toast />
            </I18nextProvider>
          </RestyleProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </Provider>
  );
}
