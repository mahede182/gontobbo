import { createStackNavigator } from "@react-navigation/stack";
import EmailLogin from "@/screens/Login/EmailLogin";
import RegisterScreen from "@/screens/Register";
import LoginScreen from "@/screens/Login/LoginScreen";

import { AuthStackParamList } from "@/@types/navigation.type";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthenticatingNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LOGIN" component={LoginScreen} />
      <Stack.Screen name="EMAIL_LOGIN" component={EmailLogin} />
      <Stack.Screen name="REGISTER" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatingNavigation;
