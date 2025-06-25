interface IResponse<T> {
  isSuccess: boolean
  message: string
  status: string
  data: T
}
interface PageResponse<T> {
  limit: number
  page: number
  results: T
  totalPages: number
  totalResults: number
}

interface IToken {
  access: TokenData
  refresh: TokenData
}

interface TokenData {
  token: string
  expires: string
}

interface UserInfo {
  phoneNumber: string
  firstName: string
  createdAt: string
  displayName: string
  lastName: string
  photoUrl: string
  email: string
  dob: string
  id: string
}
