import { create } from 'zustand'
import { Appearance } from 'react-native'
import { hybridStorage } from './securedStore'
import * as Notifications from 'expo-notifications'
import { createJSONStorage, persist } from 'zustand/middleware'

type ToasterVariant = 'info' | 'warning' | 'error' | 'success'
type IToaster = {
  message: string
  title?: string
  type: ToasterVariant
}

type AppState = {
  isDarkMode: boolean
  has_notification: boolean
  toaster: IToaster | null
  notification: Notifications.Notification[]
  notificationCount: number
  notificationChannels: Notifications.NotificationChannel[]
  notificationSettings: Record<NotificationSettingKeys, boolean>

  setNotificationChannels: (key: Notifications.NotificationChannel[]) => void
  toggleNotificationSetting: (key: NotificationSettingKeys) => void
  setNotification: (key: Notifications.Notification) => void
  setToast: (key: IToaster | null) => void
  toggleHasNotification: () => void
  toggleTheme: () => void
  resetStore: () => void
  clearToast: () => void
}

const notificationSettings: Record<NotificationSettingKeys, boolean> = {
  general: true,
  security: true,
  news: true,
  others: true,
}

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isDarkMode: Appearance.getColorScheme() === 'dark',
      notificationChannels: [],
      has_notification: false,
      notificationCount: 0,
      notificationSettings,
      notification: [],
      autoLogin: false,
      toaster: null,
      favorites: [],

      setToast: (key) => set(() => ({ toaster: key })),
      toggleHasNotification: () => set({ has_notification: false }),
      toggleTheme: () => set((_state) => ({ isDarkMode: !_state.isDarkMode })),
      setNotification(key) {
        const updatedNotifications = [...get().notification, key]
        const count = updatedNotifications.length
        Notifications.setBadgeCountAsync(count)

        set({
          notificationCount: count,
          has_notification: true,
          notification: updatedNotifications,
        })
      },
      setNotificationChannels(key) {
        set({ notificationChannels: key })
      },
      toggleNotificationSetting(key) {
        set((state) => ({
          notificationSettings: {
            ...state.notificationSettings,
            [key]: !state.notificationSettings[key],
          },
        }))
      },
      clearToast: () => set({ toaster: null }),
      clearNotifications: async () => {
        await Notifications.dismissAllNotificationsAsync()
        await Notifications.setBadgeCountAsync(0)
        set({
          notification: [],
          notificationCount: 0,
          has_notification: false,
        })
      },
      resetStore() {
        set({
          toaster: null,
          notification: [],
          isDarkMode: false,
          notificationSettings,
          notificationCount: 0,
          has_notification: false,
        })
      },
    }),
    {
      name: 'patternedAppStore',
      storage: createJSONStorage(() => hybridStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        notificationSettings: state.notificationSettings,
      }),
    }
  )
)

export default useAppStore
export const store = () => useAppStore()
