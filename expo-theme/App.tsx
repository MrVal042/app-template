import React from 'react'
import { LoadApp } from '@navigation'
import * as SplashScreen from 'expo-splash-screen'
import * as Notifications from 'expo-notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { useNotification, useRequestClient, useTheme } from '@hooks'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export default function App() {
  const queryClient = useRequestClient()
  const { colors } = useTheme()
  useNotification()

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer
            theme={colors}
            onReady={async () => await SplashScreen.hideAsync()}
            linking={{
              enabled: true,
              prefixes: [
                'https://patterned.live', // universal/app link + web fallback
                'exp+patterned://', // still useful for dev with Expo Go
                'patterned://', // custom scheme for iOS/Android
              ],
              config: {
                screens: {
                  ResetPassword: 'reset-password', // 👈 deep link target
                  VerifyEmail: 'verify-email/:token',
                  // other routes...
                },
              },
            }}
          >
            <LoadApp />
          </NavigationContainer>
        </GestureHandlerRootView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
