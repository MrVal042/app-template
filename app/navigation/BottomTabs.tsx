import { Icon, IconProps } from '@components'
import { useApp } from '@hooks'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  AccountScreen,
  AddListScreen,
  Explore,
  ForSaleScreen,
  HomeScreen,
  Wishlist,
} from '@screens'
import { Role } from '@utils'

const { Navigator, Screen, Group } = createBottomTabNavigator<TabRoutes>()

const BottomTabs = () => {
  const { colors, user } = useApp()

  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, IconProps['name']> = {
            Home: 'home-outline',
            Explore: 'compass-outline',
            Account: 'person-outline',
          }
          return <Icon name={icons[route.name]} size={size} color={color} />
        },
        tabBarStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Screen name='Home' component={HomeScreen} />
      <Screen name='Explore' component={Explore} />
      <Screen name='Account' component={AccountScreen} />
    </Navigator>
  )
}

export default BottomTabs
