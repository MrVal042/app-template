import { Platform } from 'react-native'
import { create } from 'zustand'

type stateKey = 'isNewUser' | 'isRegistered' | 'autoLogin'
type ToasterVariant = 'info' | 'warning' | 'error' | 'success'
type IToaster = {
  message: string
  title?: string
  type: ToasterVariant
}

type AppState = {
  isDarkMode: boolean
  toaster: IToaster | null
  setToast: (key: IToaster | null) => void
  toggleState: (key: stateKey) => void
}

const useAppStore = create<AppState>((set) => ({
  toaster: null,
  isDarkMode: Platform.OS === 'ios',

  setToast: (key) => set(() => ({ toaster: key })),

  toggleState: (key) => set((state) => ({ [key]: !state[key] })),
}))

export default useAppStore
