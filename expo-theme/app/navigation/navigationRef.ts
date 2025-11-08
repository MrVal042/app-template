import {
  CompositeNavigationProp,
  createNavigationContainerRef,
  NavigatorScreenParams,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: NativeStackNavigationProp<ParamList, RouteName>
  route: RouteProp<ParamList, RouteName>
}

export interface RootNavigationProp<
  ParentParamList extends ParamListBase,
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<ParamList, Extract<RouteName, string>>,
    NativeStackNavigationProp<ParentParamList, Extract<RouteName, string>>
  >
  route: RouteProp<ParamList, RouteName>
}

export type useRootNavigationProp<
  ParentParamList extends ParamListBase,
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> = CompositeNavigationProp<
  NativeStackNavigationProp<ParamList, Extract<RouteName, string>>,
  NativeStackNavigationProp<ParentParamList, Extract<RouteName, string>>
>

export type useStackNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> = NativeStackNavigationProp<ParamList, RouteName>

// AppRoute /////////////////////////////////////////////////////
export type AppRoute = {
  Tabs: NavigatorScreenParams<TabRoutes>
  AccountNavigator: NavigatorScreenParams<AccountRoutes>
  AuthNavigator: NavigatorScreenParams<AuthRoutes>
  NotificationNavigator: NavigatorScreenParams<NotificationRoutes>
  NotificationDetails: { id: string }
  NotificationEntry: undefined
}

export const navigationRef = createNavigationContainerRef<AppRoute>()
