import * as Yup from 'yup'
import { ObjectShape } from 'yup'

const passwordRegExr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/

export const validateYulObj = (obj: ObjectShape) => {
  return Yup.object().shape(obj)
}
export const subject = Yup.string()
  .required('Please enter your Subject')
  .label('Subject')

export const confirm_password = Yup.string()
  .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
  .required('Please confirm your password')

export const email = Yup.string()
  .required('Please enter your email')
  .email('Email is invalid')
  .label('Email')

export const password = Yup.string()
  .matches(
    passwordRegExr,
    'Password must contain at least 5 characters, including UPPER/lowercase and numbers'
  )
  .required('Please enter your password')
  .min(8, 'Password must be at least 8 characters long')
  .label('Password')
export const current_password = Yup.string()
  .required('Please enter your password')
  .min(8, 'Password must be at least 8 characters long')
  .label('currentPassword')

export const phone_number = Yup.string()
  .required('Phone number is required')
  .min(8, 'Phone must be at least 8 digits long')
  .label('Phone Number')

export const first_name = Yup.string()
  .required('Please input your first name')
  .min(2, 'First name must be at least 2 digits long')
  .label('First Name')

export const last_name = Yup.string()
  .required('Please input your first name')
  .min(2, 'First name must be at least 2 digits long')
  .label('First Name')

export const dob = Yup.string()
  .required('Please select your date of birth')
  .label('Date of Birth')

export const pin = Yup.string()
  .required('You need to confirm your pin')
  .min(4, 'Pin must be at least 4 digits long')
  .label('Pin')

export const confirm_pin = Yup.string()
  .oneOf([Yup.ref('pin'), undefined], 'Pin must match')
  .required('Please confirm your pin')

export const token = Yup.string()
  .required('Please enter your OTP')
  .min(6, 'OTP must be at least 5 digits long')
  .label('OTP')

export const country = Yup.string()
  .required('Please select a country')
  .min(3, 'Please select a country')
  .label('Country of Residence')

export const note = Yup.string().required('Please enter note')
export const amount = Yup.number().required('Please enter amount')
export const address = Yup.string().required('Please enter address')
export const city = Yup.string().required('Please enter city')
export const title = Yup.string().required('Please select title')
export const gender = Yup.string().required('Please enter gender')
export const date = Yup.string().required('Please select date')
export const duration = Yup.string().required('Please enter Duration')
export const frequency = Yup.string().required('Please enter Frequency')
export const name = Yup.string().required('Please enter name')
export const marital_status = Yup.string().required(
  'Please select marital status'
)
export const purpose = Yup.string().required('Please enter purpose')
export const user_name = Yup.string()
  .required('Please enter user_name')
  .label('user_name')
export const price = Yup.string().required('Please enter price')
export const state = Yup.string().required('Please enter State')
export const reason = Yup.string().required('Please enter reason')
export const bundle = Yup.string().required('Please select bundle')
export const source = Yup.string().required('Please select source')
export const features = Yup.string().required('Please select features')
export const category = Yup.string().required('Please select  Category')
export const description = Yup.string().required('Please enter description')

export const validateUnknownValue = (value?: string) => {
  const knownValue = Yup.string()
    .required(`${value} can't be empty`)
    .label(`${value}`)
  return knownValue
}

export const signup_schema = validateYulObj({
  confirm_password,
  email,
  password,
  phone_number,
})

export const password_schema = validateYulObj({
  confirm_password,
  password,
})

export const personal_info_schema = validateYulObj({
  first_name,
  last_name,
  user_name,
  phone_number,
  title,
  dob,
  gender,
})

export const reset_pin_schema = validateYulObj({
  pin,
  confirm_pin,
})

export const forgot_pwd_schema = validateYulObj({
  phone_number,
  pin,
})

export const login_schema = validateYulObj({
  password: Yup.string()
    .required('Please enter your password')
    .label('Password'),
  email,
})

export const reset_pwd_schema = validateYulObj({
  code: token,
  confirm_password,
  password,
})

export const update_pwd_schema = validateYulObj({
  confirm_password,
  current_password,
  password,
})

export const image_schema = validateYulObj({
  image: Yup.string().required('Please upload an image').label('Image'),
})


export const address_schema = validateYulObj({
  address: Yup.string().required('Please enter your address').label('Address'),
  city: Yup.string().required('Please enter your city').label('City'),
  lga: Yup.string().required('Please enter your LGA').label('LGA'),
  state: Yup.string().required('Please enter your state').label('State'),
})



export const send_mail_schema = validateYulObj({
  body: Yup.string().required("Message can't be empty").label('Message'),
  email,
  name: Yup.string().required('Please enter your full name').label('Name'),
  subject,
})

