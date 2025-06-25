import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type stateKey = 'isNewUser' | 'isRegistered' | 'autoLogin' | 'isDarkMode'
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
  autoLogin: boolean
  isDarkMode: boolean
  logout: () => void
  toaster: IToaster | null
  login: (user: UserInfo) => void
  setUser: (user: UserInfo) => void
  toggleState: (key: stateKey) => void
  setToast: (key: IToaster | null) => void
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      toaster: null,
      autoLogin: false,
      isNewUser: false,
      isRegistered: false,
      isDarkMode: Platform.OS === 'ios',

      login: (user) => set({ user }),

      setUser: (user) => set({ user }),

      setToast: (key) => set(() => ({ toaster: key })),

      toggleState: (key) => set((state) => ({ [key]: !state[key] })),

      logout: () =>
        set({
          user: null,
          autoLogin: false,
          isDarkMode: Platform.OS === 'ios',
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

export default useStore
