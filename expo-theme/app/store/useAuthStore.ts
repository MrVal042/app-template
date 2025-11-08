import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { removeTokens, secureStorage } from './securedStore'
import { Platform } from 'react-native'

type stateKey = 'isNewUser' | 'isRegistered'

type AuthState = {
  isAuthenticated: boolean
  isRegistered: boolean
  user: UserInfo | null
  isNewUser: boolean
  accessToken: string | null
  autoLogin: boolean
  deviceInfo: DeviceInfo

  logout: () => void
  toggleAutoLogin: () => void
  setDeviceInfo: (payload: DeviceInfo) => void
  loginUser: (user: UserInfo | null, accessToken: string | null) => void
  toggleState: (key: stateKey, state?: boolean) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isNewUser: true,
      autoLogin: false,
      accessToken: null,
      isRegistered: false,
      isAuthenticated: false,
      deviceInfo: {
        deviceOS: Platform.OS,
        deviceToken: null,
        deviceName: null,
        osVersion: null,
      },

      logout() {
        set((state) => {
          const id = state.user?.id
          const resetState: Partial<AuthState> = {
            isAuthenticated: false,
            user: null,
            accessToken: null,
          }
          if (!state.autoLogin) {
            resetState.autoLogin = false
            secureStorage?.removeItem('patternedAuthStore')
            removeTokens(id)
          }
          return resetState
        })
      },

      loginUser: (user, accessToken) =>
        set({ user, isAuthenticated: !!user, isNewUser: false, accessToken }),
      setDeviceInfo: (payload) => set({ deviceInfo: payload }),

      toggleAutoLogin: () => set((state) => ({ autoLogin: !state.autoLogin })),
      toggleState: (key, state) =>
        set((_state) => ({ [key]: state || !_state[key] })),
    }),
    {
      name: 'patternedAuthStore',
      storage: secureStorage,
      partialize: (state) => ({
        isRegistered: state.isRegistered,
        autoLogin: state.autoLogin,
        isNewUser: state.isNewUser,
        user: state.user,
      }),
    }
  )
)

export const useAuth = useAuthStore
export default useAuthStore
