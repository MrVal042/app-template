import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LinkingOptions } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AuthNavigator from './AuthNavigator'
import RootNavigator from './AppNavigator'
import { useTheme } from '@hooks'
import { useAuth } from '@store'
import Toaster from './Toaster'

type IPros = {
  onReady?: () => void
  linking?: LinkingOptions<ReactNavigation.RootParamList>
}

export default function LoadApp({ onReady, linking }: IPros) {
  const { user } = useAuth()
  const isAuthenticated = !!user
  const { isDarkMode, rBackground } = useTheme()

  const statusBarBackground = useAnimatedStyle(() => ({
    backgroundColor: rBackground.backgroundColor,
    height: 0,
  }))

  return (
    <SafeAreaProvider>
      <Animated.View style={statusBarBackground} />
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
        animated={true}
        translucent
      />
      {isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
      <Toaster />
    </SafeAreaProvider>
  )
}
