import { KeyboardTypeOptions } from 'react-native'

export const loginValues = { email: '', password: '' }
export const signupValues = {
  confirm_password: '',
  phone_number: '',
  password: '',
  email: '',
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
    name: 'confirm_password',
    keyboardType: 'default',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
    secureTextEntry: false,
    keyboardType: 'phone-pad',
    placeholder: 'Enter your phone number',
  },
]
