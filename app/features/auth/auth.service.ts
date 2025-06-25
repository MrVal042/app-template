import axios from 'axios'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  // Attach token from Zustand or SecureStore
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    return Promise.reject(error)
  }
)

export default api
