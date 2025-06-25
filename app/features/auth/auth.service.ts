import { api } from '@services'
import { useStore } from '@store'

type LoginModel = {
  email: string
  password: string
}

export default function useAuth() {
  const setUser = useStore((s) => s.setUser)
  const login = async ({ email, password }: LoginModel) => {
    const res = await api.post('/login', { email, password })
    setUser(res.data.user)
  }
  return { login }
}
