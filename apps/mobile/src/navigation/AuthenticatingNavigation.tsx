import { createStackNavigator } from "@react-navigation/stack";
import EmailSignin from "@/screens/SignIn/EmailSignin";
import SignUpScreen from "@/screens/SignUp";
import SignIn from "@/screens/SignIn";
import OtpScreen from "@/screens/Otp/OtpScreen";

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

const AuthenticatingNavigation = ({ actorRef }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="SIGN_IN">
        {(props) => {
          return (
            <SignIn
              onSignInPress={(user, password) => {
                actorRef.send({ type: "SIGN_IN", user, password });
              }}
              {...props}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="EMAIL_SIGN_IN">
        {(props) => {
          return (
            <EmailSignin
              onSignInPress={(user, password) => {
                actorRef.send({ type: "SIGN_IN", user, password });
              }}
              {...props}
            />
          );
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="SIGN_UP">
        {(props) => {
          return <SignUpScreen {...props} />;
        }}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="OTP">
        {(props) => {
          return <OtpScreen {...props} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthenticatingNavigation;
