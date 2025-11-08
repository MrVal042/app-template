import { useEffect } from 'react'
import * as Linking from 'expo-linking'
import { api, app, auth } from './endpoint'
import { useAppStore, useAuth } from '@store'
import { useNavigation } from '@react-navigation/native'

export const useSignUp = () => {
  const handleAuth = useAuthHandler()
  return auth.useSignUp(handleAuth)
}
export const useLogin = () => {
  const handleAuth = useAuthHandler()
  return auth.useSignIn(handleAuth)
}

export const useLogOut = () => {
  const { logout } = useAuth()
  return auth.useSignOut(logout)
}

export const useUpdateUser = () => {
  const { loginUser } = useAuth()
  return app.useUpdateUser(loginUser)
}

export const useGetProfile = () => {
  const { loginUser } = useAuth()
  return app.useGetProfile(loginUser)
}

export const usePasswordRecovery = ({
  onRecovered,
}: {
  onRecovered?: () => void
}) => {
  useEffect(() => {
    const subscription = Linking.addEventListener('url', async ({ url }) => {
      const { queryParams } = Linking.parse(url)

      if (queryParams?.type === 'recovery' && queryParams?.access_token) {
        const { data } = await api.auth.recoverPassword({
          access_token: queryParams.access_token as string,
          refresh_token: queryParams.refresh_token as string,
        })

        if (data.session) {
          onRecovered?.() // 👈 triggers navigation
        }
      }
    })

    return () => subscription.remove()
  }, [])
}

export function useAuthHandler() {
  const { isRegistered, loginUser, toggleState, logout } = useAuth()
  const navigation = useNavigation<any>()
  const { setToast } = useAppStore()

  const handleAuth = (user: UserInfo, source: string) => {
    if (!user) {
      logout()
      __DEV__ && console.log('No user. Logged out.', source)
      return
    }

    // Handle verification
    if (!user.email_verified) {
      setToast({
        title: 'Email Not Verified',
        message: 'Please verify your email to continue.',
        type: 'info',
      })
      navigation.navigate('VerifyCode', { email: user.email })
      return
    }

    // Handle incomplete profile
    if (!user.address || !user.dob) {
      setToast({
        title: 'Complete Your Profile',
        message: 'Let’s finish setting up your account.',
        type: 'info',
      })
      navigation.navigate('PersonalInfo')
      return
    }

    if (!isRegistered) toggleState('isRegistered', true)
    loginUser(user, null)

    __DEV__ &&
      console.log(`✅ Auth success: {name: ${user.display_name}`, source)
  }

  return handleAuth
}
