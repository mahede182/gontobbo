import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type HomeParamList = {
  HOME: undefined
  FAVOURITE: undefined
  EXAMPLE: {
    example: ""
  }
}

export type AddEmailScreenRouteList = RouteProp<HomeParamList, 'ADD_EMAIL'>
