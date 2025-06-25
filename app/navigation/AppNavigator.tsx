import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from './BottomTabs'
import { AppRoute } from './navigationRef'

import { FeaturedProperty, FilterList, RecentlyViewed } from '@screens'
import AccountNavigator from './AccountNavigator'
import AuthNavigator from './AuthNavigator'
import ChatNavigator from './ChatNavigator'
import ListNavigator from './ListNavigator'

const { Navigator, Screen, Group } = createNativeStackNavigator<AppRoute>()

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
      <Screen name='ListNavigator' component={ListNavigator} />
      <Screen name='ChatNavigator' component={ChatNavigator} />
      <Screen name='AuthNavigator' component={AuthNavigator} />
      <Screen name='AccountNavigator' component={AccountNavigator} />
      <Group screenOptions={{ animation: 'slide_from_bottom' }}>
        <Screen name='FilterList' component={FilterList} />
        <Screen name='RecentlyViewed' component={RecentlyViewed} />
        <Screen name='FeaturedProperty' component={FeaturedProperty} />
      </Group>
    </Navigator>
  )
}
