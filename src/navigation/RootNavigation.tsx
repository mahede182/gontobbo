import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatingNavigation, { AuthStackParamList } from "./AuthenticatingNavigation";
import { useApp } from "@/hooks/useApp";
import IntroNavigation, { IntroStackParamList } from "./IntroNavigation";
import AuthenticatedNavigation, { AuthdStackParamList } from "./AuthenticatedNavigation";
import { navigationRef } from "@/utils/helper";
import { useEffect, useState } from "react";
import { clear, getItem, saveItem } from "@/utils/storage";
import { INTRO_SHOWN } from "@/constants/config";
import { useIntroShown } from "@/hooks/useIntroShown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InitScreen from "@/screens/Init/InitScreen";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

export type RootStackParamList = {
  INITIAL_LOAD: IntroStackParamList;
  AUTH: AuthStackParamList;
  HOME: AuthdStackParamList;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { send, state } = useApp();
  const [showInit, setShowinit] = useState(true);
  const [keys, setKeys] = useState<string[]>([]);
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const showIntro = useIntroShown();

  return (
    <NavigationContainer
      onReady={() => {
        send({ type: "START_APP" });
      }}
      ref={navigationRef}>
      <Stack.Navigator initialRouteName={showIntro ? "INITIAL_LOAD" : "AUTHENTICATING"}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="INITIAL_LOAD"
          component={IntroNavigation}
        />

        <Stack.Screen options={{ headerShown: false }} name="AUTHENTICATING">
          {(props) => {
            // return state.context.refAuthenticating ? (
            return (
              <AuthenticatingNavigation actorRef={state.context.refAuthenticating} {...props} />
            );
          }}
        </Stack.Screen>

        <Stack.Screen options={{ headerShown: false }} name="AUTHENTICATED">
          {(props) => {
            // return state.context.refAuthenticated ? (
            return <AuthenticatedNavigation actorRef={state.context.refAuthenticated} {...props} />;
            // ) : null;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
