import React from 'react'
import { capitalize } from '@utils'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { useAppStore, useAuth } from '@store'
import * as Notifications from 'expo-notifications'

// Notification handler config
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowList: true,
  }),
})

export default function useNotification() {
  const { deviceInfo, setDeviceInfo } = useAuth()
  const { setNotification, setNotificationChannels } = useAppStore()

  React.useEffect(() => {
    ;(async () => {
      const token = await registerPushNotifications()
      if (token && !token.includes('Error')) {
        setDeviceInfo({ ...deviceInfo, deviceToken: token })
      }
    })()

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then((channels) =>
        setNotificationChannels(channels ?? [])
      )
    }

    const onReceive = (notification: Notifications.Notification) => {
      setNotification(notification)
    }

    const onResponse = (response: Notifications.NotificationResponse) => {
      console.log('🔔 Notification response:', response)
    }

    const subReceive = Notifications.addNotificationReceivedListener(onReceive)
    const subResponse =
      Notifications.addNotificationResponseReceivedListener(onResponse)

    return () => {
      subReceive.remove()
      subResponse.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const registerPushNotifications = async () => {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default Channel',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }

      if (!Device.isDevice) {
        showToast('Must use physical device for Push Notifications', 'info')
        return 'Error: Emulator not supported'
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        showToast('Failed to grant permission for push notification!', 'error')
        return 'Error: Permission denied'
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId

      if (!projectId) {
        showToast('App not registered. Missing EAS projectId', 'error')
        return 'Error: Missing projectId'
      }

      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data
      if (__DEV__)
        console.log(`🔑 ${capitalize(Platform.OS)} Push Token:`, token)
      return token
    } catch (error: any) {
      showToast(`Push registration failed: ${error.message}`, 'error')
      return `Error: ${error.message}`
    }
  }

  const showToast = (message: string, type: 'error' | 'info') => {
    const setToast = useAppStore.getState().setToast
    setToast({
      message,
      type,
      title:
        type === 'error' ? 'Push Notifications Failed' : 'Push Notifications',
    })
  }

  return { registerPushNotifications }
}
