import { createStackNavigator } from "@react-navigation/stack";
import EmailLogin from "@/screens/Login/EmailLogin";
import RegisterScreen from "@/screens/Register";
import LoginScreen from "@/screens/Login/LoginScreen";

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
  LOGIN: undefined;
  EMAIL_LOGIN: undefined;
  REGISTER: undefined;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<AuthStackParamList>();

const AuthenticatingNavigation = ({ actorRef }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="LOGIN">
        {(props) => {
          return (
            <LoginScreen
              onLoginPress={(user, password) => {
                actorRef.send({ type: "LOGIN", user, password });
              }}
              {...props}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="EMAIL_LOGIN">
        {(props) => {
          return (
            <EmailLogin
              onLoginPress={(user, password) => {
                actorRef.send({ type: "LOGIN", user, password });
              }}
              {...props}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="REGISTER">
        {(props) => {
          return (
            <RegisterScreen
              onRegisterSuccess={() => {
                actorRef.send({ type: "LOGIN" });
              }}
              {...props}
            />
          );
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthenticatingNavigation;
