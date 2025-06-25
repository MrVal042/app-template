import React from 'react'
import { useAppStore } from '@store'
import api from '@services'

export default function useAuth() {
  const setUser = useAppStore((s) => s.setUser)
  const login = async (email, password) => {
    const res = await api.post('/login', { email, password })
    setUser(res.data.user)
  }
  return { login }
}
