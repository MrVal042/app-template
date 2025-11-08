import { KeyboardTypeOptions } from 'react-native'

export const loginValues = { email: '', password: '' }
export const signupValues = {
  confirmPassword: '',
  password: '',
  email: '',
  phone: '',
}

export type loginForm = typeof loginValues
export type signupForm = typeof signupValues

export const loginData: {
  keyboardType: KeyboardTypeOptions
  secureTextEntry?: boolean
  name: keyof loginForm
  placeholder?: string
  label: string
}[] = [
  {
    name: 'email',
    label: 'Email',
    secureTextEntry: false,
    keyboardType: 'email-address',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    secureTextEntry: true,
    keyboardType: 'default',
    placeholder: 'Enter your password',
  },
]

export const signupData: {
  keyboardType: KeyboardTypeOptions
  secureTextEntry?: boolean
  name: keyof signupForm
  placeholder?: string
  label: string
}[] = [
  {
    name: 'email',
    label: 'Email',
    secureTextEntry: false,
    keyboardType: 'email-address',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Password',
    secureTextEntry: true,
    keyboardType: 'default',
    placeholder: 'Enter your password',
  },
  {
    secureTextEntry: true,
    name: 'confirmPassword',
    keyboardType: 'default',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    secureTextEntry: false,
    keyboardType: 'phone-pad',
    placeholder: 'Enter your phone number',
  },
]
