import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from './BottomTabs'
import { AppRoute } from './navigationRef'

import AccountNavigator from './AccountNavigator'
import AuthNavigator from './AuthNavigator'
import { NotificationDetails, NotificationEntry } from '@features'

const { Navigator, Screen } = createNativeStackNavigator<AppRoute>()

export default function RootNavigator() {
  return (
    <Navigator
      initialRouteName='Tabs'
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}
    >
      <Screen name='Tabs' component={BottomTabs} />
      <Screen name='AuthNavigator' component={AuthNavigator} />
      <Screen name='AccountNavigator' component={AccountNavigator} />
      <Screen name='NotificationEntry' component={NotificationEntry} />
      <Screen name='NotificationDetails' component={NotificationDetails} />
    </Navigator>
  )
}
