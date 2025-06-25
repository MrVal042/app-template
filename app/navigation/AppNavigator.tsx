import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from './BottomTabs'
import { AppRoute } from './navigationRef'

import AccountNavigator from './AccountNavigator'
import AuthNavigator from './AuthNavigator'

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
    </Navigator>
  )
}
