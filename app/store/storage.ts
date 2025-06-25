import dayjs from 'dayjs'
import * as SecureStore from 'expo-secure-store'

export enum Token {
  Access = 'accessToken',
  Refresh = 'refreshToken',
}

export const setToken = async (
  key: Token,
  value: { token: string; expires: string }
) => {
  try {
    await Promise.all([
      SecureStore.setItemAsync(key, value.token),
      SecureStore.setItemAsync(`${key}Expires`, value.expires),
    ])
  } catch (error) {
    __DEV__ && console.error('Error:', error)
  }
}

export const persistTokens = async ({ access, refresh }: IToken) => {
  await Promise.all([
    setToken(Token.Access, access),
    setToken(Token.Refresh, refresh),
  ])
}

export const getToken = async (key: Token): Promise<TokenData | null> => {
  try {
    const tokens = await Promise.all([
      SecureStore.getItemAsync(key),
      SecureStore.getItemAsync(`${key}Expires`),
    ])
    return tokens.length > 0
      ? { token: tokens[0] as string, expires: tokens[1] as string }
      : null
  } catch (error) {
    __DEV__ && console.error('Error:', error)
    return null
  }
}

export const removeTokens = async () => {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(Token.Access),
      SecureStore.deleteItemAsync(`${Token.Access}Expires`),
      SecureStore.deleteItemAsync(`${Token.Refresh}Expires`),
      SecureStore.deleteItemAsync(Token.Refresh),
    ])
  } catch (error) {
    __DEV__ && console.error('Error:', error)
  }
}

export const isTokenValid = (tokens: IToken): boolean => {
  const isValid = dayjs().isAfter(dayjs(tokens.access.expires))
  if (isValid) {
    __DEV__ &&
      console.log('✅ Token is still valid', isValid, tokens.access.expires)
    persistTokens(tokens)
  } else {
    __DEV__ &&
      console.log('❌ Token has expired', isValid, tokens.access.expires)
    removeTokens()
  }
  return isValid
}
