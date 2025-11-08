declare module '*.png' {
  const value: import('react-native').ImageSourcePropType
  export default value
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType
  export default value
}

declare global {
  type DeviceInfo = {
    deviceToken: string | null
    deviceName: string | null
    osVersion: string | null
    deviceOS: string | null
  }

  interface IHeader {
    title?: string
    leftAdornment?: React.ReactNode | null
    rightAdornment?: React.ReactNode | null
    hideGoBack?: boolean
  }

  type LoginModel = {
    email: string
    password: string
  }

  type SignupModel = {
    email_verified: boolean
    phone_number: string
    display_name: string
    address: string
    first_name: string
    last_name: string
    avatar_url: string
    email: string
    dob: string
  }

  interface UserInfo {
    email_verified: boolean
    phone_number: string
    display_name: string
    address: string
    first_name: string
    last_name: string
    avatar_url: string
    email: string
    dob: string
    id: string
  }
}

export {}
