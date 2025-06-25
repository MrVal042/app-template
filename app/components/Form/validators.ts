import * as Yup from 'yup'
import { ObjectShape } from 'yup'

const passwordRegExr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/

export const validateYulObj = (obj: ObjectShape) => {
  return Yup.object().shape(obj)
}
export const subject = Yup.string()
  .required('Please enter your Subject')
  .label('Subject')

export const confirmPassword = Yup.string()
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
export const currentPassword = Yup.string()
  .required('Please enter your password')
  .min(8, 'Password must be at least 8 characters long')
  .label('currentPassword')

export const bankLinkPassword = Yup.string()
  .required('Please enter your password')
  .min(6, 'Password must be at least 6 characters long')
  .label('Password')

export const phoneNumber = Yup.object().shape({
  dialCode: Yup.object().shape({
    code: Yup.string().required(),
    dial_code: Yup.string().required(),
    flag: Yup.string().required(),
    name: Yup.string().required(),
  }),
  value: Yup.string().required('Phone number is required'),
  withDialCode: Yup.string().required(),
})
export const firstName = Yup.string()
  .required('Please input your first name')
  .min(2, 'First name must be at least 2 digits long')
  .label('First Name')

export const lastName = Yup.string()
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

export const confirmPin = Yup.string()
  .oneOf([Yup.ref('pin'), undefined], 'Pin must match')
  .required('Please confirm your pin')

export const token = Yup.string()
  .required('Please enter your OTP')
  .min(6, 'OTP must be at least 5 digits long')
  .label('OTP')

export const accountName = Yup.string()
  .required('Please enter destination account name')
  .label('Account name')

export const accountNumber = Yup.string()
  .required('Please enter destination account Number')
  .min(10, 'Account number must be at least 10 digits long')
  .label('Account number')

export const country = Yup.string()
  .required('Please select a country')
  .min(3, 'Please select a country')
  .label('Country of Residence')

export const note = Yup.string().required('Please enter note')
export const amount = Yup.number().required('Please enter amount')
export const address = Yup.string().required('Please enter address')
export const addressType = Yup.string().required('Please select addressType')
export const city = Yup.string().required('Please enter city')
export const title = Yup.string().required('Please select title')
export const gender = Yup.string().required('Please enter gender')
export const saveAmount = Yup.number().required('Please enter amount')
export const date = Yup.string().required('Please select date')
export const duration = Yup.string().required('Please enter Duration')
export const frequency = Yup.string().required('Please enter Frequency')
export const name = Yup.string().required('Please enter name')
export const maritalStatus = Yup.string().required(
  'Please select marital status'
)
export const purpose = Yup.string().required('Please enter purpose')
export const userName = Yup.string()
  .required('Please enter userName')
  .label('userName')
export const price = Yup.string().required('Please enter price')
export const state = Yup.string().required('Please enter State')
export const reason = Yup.string().required('Please enter reason')
export const bundle = Yup.string().required('Please select bundle')
export const source = Yup.string().required('Please select source')
export const features = Yup.string().required('Please select features')
export const category = Yup.string().required('Please select  Category')
export const description = Yup.string().required('Please enter description')
export const subCategory = Yup.string().required('Please select subCategory')
export const typeOFIssue = Yup.string().required(
  'Description the type of issue'
)
export const destination = Yup.number().required(
  'Please select Account Destination'
)

export const validateUnknownValue = (value?: string) => {
  const knownValue = Yup.string()
    .required(`${value} can't be empty`)
    .label(`${value}`)
  return knownValue
}

export const signUpSchema = validateYulObj({
  confirmPassword,
  email,
  password,
  phoneNumber,
})

export const passwordSchema = validateYulObj({
  confirmPassword,
  password,
})

export const personalInfoSchema = validateYulObj({
  firstName,
  lastName,
  userName,
  phoneNumber,
  title,
  dob,
  gender,
  maritalStatus,
})

export const resetPinSchema = validateYulObj({
  pin,
  confirmPin,
})

export const forgotPasswordSchema = validateYulObj({
  phoneNumber,
  pin,
})

export const loginSchema = validateYulObj({
  password,
  phoneNumber,
})

export const resetPwdSchema = validateYulObj({
  code: token,
  confirmPassword,
  password,
})

export const updatePwdSchema = validateYulObj({
  confirmPassword,
  currentPassword,
  password,
})

export const imageSchema = validateYulObj({
  image: Yup.string().required('Please upload an image').label('Image'),
})

export const proofOfAddressSchema = validateYulObj({
  doc: Yup.string()
    .required('Please select a document')
    .label('Utility Document'),
})

export const addressSchema = validateYulObj({
  address: Yup.string().required('Please enter your address').label('Address'),
  city: Yup.string().required('Please enter your city').label('City'),
  lga: Yup.string().required('Please enter your LGA').label('LGA'),
  state: Yup.string().required('Please enter your state').label('State'),
})

export const businessDetailsSchema = validateYulObj({
  bank: Yup.string().required('Please select your bank').label('Bank'),
  businessName: Yup.string()
    .required('Please enter your business name')
    .label('Business Name'),
  businessType: Yup.string()
    .required('Please select the type of your business')
    .label('Business Type'),
  cac: Yup.string()
    .required('Please enter your CAC')
    .label('CAC')
    .min(10, 'CAC must be 10 digits long'),
  doc: Yup.string()
    .required('Please select your CAC Certificate')
    .label('CAC Certificate'),
  tin: Yup.string()
    .required('Please enter your TIN')
    .label('TIN')
    .min(10, 'TIN must be 10 digits long'),
})

export const sendMailSchema = validateYulObj({
  body: Yup.string().required("Message can't be empty").label('Message'),
  email,
  name: Yup.string().required('Please enter your full name').label('Name'),
  subject,
})

export const addListSchema = validateYulObj({
  category,
  subCategory,
  name,
  price,
  features,
})
