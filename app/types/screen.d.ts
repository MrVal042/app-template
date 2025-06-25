interface IHeader {
  title?: string
  leftAdornment?: React.ReactNode | null
  rightAdornment?: React.ReactNode | null
  hideGoBack?: boolean
}

type LoginProps = {
  email: string // can be email or phone
  password: string
  phoneNumber: {
    countryCode: {
      code: string
      dial_code: string
      flag: string
      name: string
    }
    phoneNumber: string
  }
}

type SignupProps = {
  email: string
  password: string
  phoneNumber: {
    countryCode: {
      code: string
      dial_code: string
      flag: string
      name: string
    }
    phoneNumber: string
  }
}
