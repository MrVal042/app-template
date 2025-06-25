// eslint-disable-next-line import/no-unresolved
import {
  Token,
  getToken,
  // isTokenValid,
  // persistTokens,
  // removeTokens,
} from '@store'
import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Add access token to every request
api.interceptors.request.use(async (config) => {
  const token = await getToken(Token.Access)
  if (token?.token) {
    config.headers.Authorization = `Bearer ${token.token}`
  }
  return config
})

// type FailedRequest = {
//   resolve: (token: string | null) => void
//   reject: (error: any) => void
// }

// let isRefreshing = false
// let failedQueue: FailedRequest[] = []

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(({ resolve, reject }) => {
//     // eslint-disable-next-line no-unused-expressions
//     error ? reject(error) : resolve(token)
//   })
//   failedQueue = []
// }

// Handle token refresh logic
/*
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    const status = error?.response?.status

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject })
        ).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      isRefreshing = true
      try {
        const access = await getToken(Token.Access)
        const refresh = await getToken(Token.Refresh)

        if (!access?.token || !refresh?.token) {
          // useAppStore.getState().logout()
          throw new Error('No refresh token found')
        }
        const isValid = isTokenValid({ access, refresh } as IToken)

        if (!isValid) {
          const res = await axios.post(`${BASE_URL}/auth/refresh-tokens`, {
            refreshToken: refresh.token,
          })
          const { access: newAccess, refresh: newRefresh } = res.data
          // Save new tokens
          await persistTokens({ access: newAccess, refresh: newRefresh })

          // Update headers
          api.defaults.headers.common.Authorization = `Bearer ${newAccess.token}`
          originalRequest.headers.Authorization = `Bearer ${newAccess.token}`
        }
        // Update headers
        api.defaults.headers.common.Authorization = `Bearer ${access.token}`
        originalRequest.headers.Authorization = `Bearer ${access.token}`

        processQueue(null, access.token)
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        await removeTokens()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    if (status === 403) {
      await removeTokens()
    }

    return Promise.reject(error)
  }
)
*/
export default api
