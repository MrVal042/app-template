import dayjs from 'dayjs'
import { createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

interface AccessToken {
  token?: string
  validityExpiry?: number
  refreshTokenKey?: string
  refreshTokenExpiry?: number
}
interface HybridStorage {
  getItem(key?: string): Promise<string | null>
  setItem(key?: string, value?: string): Promise<void>
  removeItem(key?: string): Promise<void>
  clearAll(): Promise<void>
}

const SECURE_LIMIT = 2048
export const hybridStorage: HybridStorage = {
  async getItem(key) {
    if (!key) return null
    const secureValue = await SecureStore.getItemAsync(key)
    if (secureValue) return secureValue
    return AsyncStorage.getItem(key)
  },

  async setItem(key, value) {
    if (!key || value == null) return
    if (value.length > SECURE_LIMIT) {
      await AsyncStorage.setItem(key, value)
      await SecureStore.deleteItemAsync(key)
    } else {
      await SecureStore.setItemAsync(key, value)
      await AsyncStorage.removeItem(key)
    }
  },

  async removeItem(key) {
    if (!key) return
    await SecureStore.deleteItemAsync(key)
    await AsyncStorage.removeItem(key)
  },

  async clearAll() {
    await AsyncStorage.clear()
    const secureKeys = ['access_token', 'refresh_token', 'id']
    await Promise.all(secureKeys.map((k) => SecureStore.deleteItemAsync(k)))
  },
}

export const setToken = async (id: string, token: AccessToken) => {
  if (!id) return
  await hybridStorage.setItem(id, JSON.stringify(token))
}

export const getToken = async (id: string): Promise<AccessToken | null> => {
  if (!id) return null
  const raw = await hybridStorage.getItem(id)
  return raw ? JSON.parse(raw) : null
}

export const removeTokens = async (id?: string) => {
  if (!id) return await hybridStorage.clearAll()
  await hybridStorage.removeItem(id)
}

export const isTokenValid = (id: string, tokens: AccessToken): boolean => {
  const valid = dayjs().isBefore(dayjs(tokens.validityExpiry))
  valid ? setToken(id, tokens) : removeTokens(id)
  return valid
}

export const persistTokens = async (id: string, token: AccessToken) => {
  await setToken(id, token)
}

export const secureStorage = createJSONStorage(() => hybridStorage)
