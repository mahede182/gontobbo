import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatingNavigation, { AuthStackParamList } from "./AuthenticatingNavigation";
import { useApp } from "@/hooks/useApp";
import IntroNavigation, { IntroStackParamList } from "./IntroNavigation";
import AuthenticatedNavigation, { AuthdStackParamList } from "./AuthenticatedNavigation";
import { navigationRef } from "@/utils/helper";

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

  const isAuthenticating = state.matches("authenticating");
  const isAuthenticated = state.matches("authenticated");
  const isInitializing = state.matches("initializing");

  return (
    <NavigationContainer
      onReady={() => {
        send({ type: "START_APP" });
      }}
      ref={navigationRef}>
      <Stack.Navigator>
        {isInitializing && (
          <Stack.Screen
            options={{ headerShown: false }}
            name="INITIAL_LOAD"
            component={IntroNavigation}
          />
        )}

        {isAuthenticating && (
          <Stack.Screen options={{ headerShown: false }} name="AUTHENTICATING">
            {(props) => {
              return state.context.refAuthenticating ? (
                <AuthenticatingNavigation actorRef={state.context.refAuthenticating} {...props} />
              ) : null;
            }}
          </Stack.Screen>
        )}

        {isAuthenticated && (
          <Stack.Screen options={{ headerShown: false }} name="AUTHENTICATED">
            {(props) => {
              return state.context.refAuthenticated ? (
                <AuthenticatedNavigation actorRef={state.context.refAuthenticated} {...props} />
              ) : null;
            }}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
