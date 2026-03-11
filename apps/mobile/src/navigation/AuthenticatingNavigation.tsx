import { createStackNavigator } from "@react-navigation/stack";
import EmailLogin from "@/screens/Login/EmailLogin";
import RegisterScreen from "@/screens/Register";
import LoginScreen from "@/screens/Login/LoginScreen";
import { useLoginMutation } from "@/store/api/authApi";
import { AuthStackParamList } from "@/@types/navigation.type";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthenticatingNavigation = () => {
  const [login] = useLoginMutation();

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="LOGIN">
        {(props) => (
          <LoginScreen
            onLoginPress={(email, password) => {
              login({ email, password });
            }}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="EMAIL_LOGIN">
        {(props) => (
          <EmailLogin
            onLoginPress={(email, password) => {
              login({ email, password });
            }}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="REGISTER">
        {(props) => (
          <RegisterScreen
            onRegisterSuccess={() => {
              // After register, authApi.register's onQueryStarted
              // already handles setCredentials + token persistence
            }}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthenticatingNavigation;
