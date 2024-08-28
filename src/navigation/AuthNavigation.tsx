import { createStackNavigator } from "@react-navigation/stack";
import EmailSignin from "@/screens/SignIn/EmailSignin";
import SignUpScreen from "@/screens/SignUp";
import SignIn from "@/screens/SignIn";
import DrawerNavigation from "./DrawerNavigation";

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

export type AuthStackParamList = {
  SIGN_IN: undefined;
  EMAIL_SIGN_IN: undefined;
  SIGN_UP: undefined;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="SIGN_IN" component={SignIn} />
      <Stack.Screen options={{ headerShown: false }} name="EMAIL_SIGN_IN" component={EmailSignin} />
      <Stack.Screen options={{ headerShown: false }} name="SIGN_UP" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
