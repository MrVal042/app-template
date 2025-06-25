import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  Demography,
  ForgotPassword,
  Login,
  Onboard,
  ResetPassword,
  Signup,
  VerifyClaim,
  Welcome,
} from '@screens'

import { useApp } from '@hooks'

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export default function RootNavigator() {
  const { isNewUser, isRegistered } = useApp()

  return (
    <Navigator
      initialRouteName={
        isNewUser ? 'Onboard' : isRegistered ? 'Login' : 'Welcome'
      }
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 1000,
      }}
    >
      <Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Screen name='ForgotPassword' component={ForgotPassword} />
      <Screen name='Onboard' component={Onboard} />
      <Screen name='Demography' component={Demography} />
      <Screen name='ResetPassword' component={ResetPassword} />
      <Screen name='Signup' component={Signup} />
      <Screen name='Welcome' component={Welcome} />
      <Screen name='VerifyClaim' component={VerifyClaim} />
    </Navigator>
  )
}
