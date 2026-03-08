import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type HomeParamList = {
  HOME: undefined;
  FAVOURITE: undefined;
  ADD_EMAIL: {
    example: "";
  };
};
export type FavScreenNavigationProp = StackNavigationProp<HomeParamList>;

export type AddEmailScreenRouteList = RouteProp<HomeParamList, "ADD_EMAIL">;
