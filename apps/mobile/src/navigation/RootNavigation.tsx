import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatingNavigation from "./AuthenticatingNavigation";
import { useApp } from "@/hooks/useApp";
import AuthenticatedNavigation from "./AuthenticatedNavigation";
import { navigationRef } from "@/utils/helper";
import { useEffect, useState } from "react";
import { getItem } from "@/utils/storage";
import { STORAGE_KEYS } from "@/@types/storage.type";
import IntroNavigation from "./IntroNavigation";

export type RootStackParamList = {
  AUTHENTICATING: undefined;
  AUTHENTICATED: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { send, state } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getItem(STORAGE_KEYS.USER);
        setIsAuthenticated(!!userData);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer
      onReady={() => {
        send({ type: "START_APP" });
      }}
      ref={navigationRef}>
      <Stack.Navigator initialRouteName={isAuthenticated ? "AUTHENTICATED" : "AUTHENTICATING"}>
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
