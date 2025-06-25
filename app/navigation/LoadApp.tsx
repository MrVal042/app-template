// LoadApp.tsx
import { useTheme } from '@constants'
import { NavigationContainer } from '@react-navigation/native'
import { useAppStore } from '@store'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RootNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import Toaster from './Toaster'

export default function LoadApp() {
  const { user } = useAppStore()
  const isAuthenticated = !!user
  const { isDarkMode, rBackground } = useTheme()

  const statusBarBackground = useAnimatedStyle(() => ({
    backgroundColor: rBackground.backgroundColor,
    height: 0,
  }))

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
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
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
