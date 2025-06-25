import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type stateKey = 'isNewUser' | 'isRegistered' | 'autoLogin'
type ToasterVariant = 'info' | 'warning' | 'error' | 'success'
type IToaster = {
  message: string
  title?: string
  type: ToasterVariant
}

type AppState = {
  user: UserInfo | null
  isRegistered: boolean
  isNewUser: boolean
  logout: () => void
  toaster: IToaster | null
  login: (user: UserInfo) => void
  setToast: (key: IToaster | null) => void
  toggleState: (key: stateKey) => void
}

const useAuthStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      toaster: null,
      isNewUser: false,
      isRegistered: false,
      isDarkMode: Platform.OS === 'ios',
      login: (user) => set({ user }),

      setToast: (key) => set(() => ({ toaster: key })),

      toggleState: (key) => set((state) => ({ [key]: !state[key] })),

      logout: () =>
        set({
          user: null,
          isDarkMode: Platform.OS === 'ios',
          wishList: [],
        }),
    }),
    {
      name: 'authStorage', // Replace with name
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
)

export default useAuthStore
