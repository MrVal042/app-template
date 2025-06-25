import { api } from '@services'

export default function useUserService() {
  const getUser = async () => {
    const res = await api.get('/getUser')
    return res.data
  }
  const getUserById = async (userId: string) => {
    const res = await api.get(`/getUserById?userId=${userId}`)
    return res.data
  }
  const updateUser = async (body: Partial<UserInfo>) => {
    const res = await api.patch('/updateUser', { body })
    return res.data
  }
  return { getUserById, getUser, updateUser }
}
