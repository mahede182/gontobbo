import { createStackNavigator } from "@react-navigation/stack";
import InitScreen from "@/screens/Init/InitScreen";

export type IntroStackParamList = {
  INIT: undefined;
};

const Stack = createStackNavigator<IntroStackParamList>();

const IntroNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="INIT">
        {(props) => {
          return <InitScreen {...props} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default IntroNavigation;
