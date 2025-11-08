export const api: any = ''

const useSignIn =
  (fn: (user: UserInfo, source: string) => void) =>
  async ({ email, password }: LoginModel) => {
    const res = await api.post('/login', { email, password })
    fn(res.data, 'login')
    return { data: res.data }
  }

const useSignUp =
  (fn: (user: UserInfo, source: string) => void) =>
  async (payload: SignupModel) => {
    const res = await api.post('/signup', payload)
    fn(res.data, 'signup')
    return { data: res.data }
  }
const useSignOut = (fn: () => void) => async (payload: SignupModel) => {
  const res = await api.post('/signup', payload)
  fn()
  return { data: res.data }
}
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
const useChangePassword = async () => {
  const res = await api.post('/', {})
  return { data: res.data }
}
const useVerifyCode = async () => {
  const res = await api.post('/', {})
  return { data: res.data }
}
const useCurrentUser = async () => {
  const res = await api.post('/', {})
  return { data: res.data }
}

const useForgotPassword = async () => {
  const res = await api.post('/', {})
  return { data: res.data }
}
const useResetPassword = async () => {
  const res = await api.post('/', {})
  return { data: res.data }
}
const useResendCode = async () => {
  const res = await api.post('/', {})
  return { data: res.data }
}

const useUpdateUser =
  (fn: (user: UserInfo | null, accessToken: string | null) => void) =>
  async () => {
    const res = await api.get('/')

    fn(res.data, 'updateUser')
    return { data: res.data }
  }
const useGetProfile =
  (fn: (user: UserInfo | null, accessToken: string | null) => void) =>
  async () => {
    const res = await api.get('/')
    fn(res.data, 'setUser')
    return { data: res.data }
  }

export const auth = {
  getUserById,
  getUser,
  useSignIn,
  useSignUp,
  updateUser,
  useSignOut,
  useChangePassword,
  useCurrentUser,
  useForgotPassword,
  useResendCode,
  useResetPassword,
  useVerifyCode,
}

export const app = {
  useUpdateUser,
  useGetProfile,
}
