import { AxiosError } from 'axios'
import dayjs from 'dayjs'

export enum Role {
  Buyer = 'Buyer',
  Seller = 'Seller',
  Guest = 'Guest',
}

export const handlerError = (error: unknown) => {
  if (error) {
    let message = 'An unexpected error occurred.'
    let code = ''
    let status = 0
    let responseURL = ''

    if ((error as AxiosError)?.isAxiosError) {
      const axiosError = error as AxiosError<any>
      if (axiosError.code) {
        code = axiosError.code
      }
      if (axiosError.status) {
        status = axiosError.status
      }
      if (axiosError.response?.data?.message) {
        message = axiosError.response.data.message
      } else if (axiosError.message) {
        message = axiosError.message
      }
      responseURL =
        axiosError.request?.responseURL ||
        `${axiosError.config?.baseURL || ''}${axiosError.config?.url || ''}`
    } else if (error instanceof Error) {
      message = error.message
    }
    if (__DEV__) {
      console.log(
        '__DEV__ Error: 🚀🚀👨',
        '\n{',
        '\n   code: ',
        code,
        '\n   message:',
        message,
        '\n   error: ',
        error,
        '\n   url: ',
        responseURL,
        '\n}'
      )
    }

    return { message, code, status }
  }
}

export const formatDate = (date: string) => dayjs(date).format('MMM DD, YYYY')

export const getToday = (type: 'year' | 'month' | 'day' | 'date') => {
  switch (type) {
    case 'year':
      return dayjs().format('YYYY')
    case 'month':
      return dayjs().format('MMM')
    case 'day':
      return dayjs().format('DDD')

    default:
      return dayjs().format('YYYY')
  }
}

export const formatLikes = (count: number) => {
  const K = 1000
  const M = 1000000
  const B = 1000000000

  if (count >= B) {
    return `${(count / B).toFixed(1)}B`
  }
  if (count >= M) {
    return `${(count / M).toFixed(1)}M`
  }
  if (count >= K) {
    return `${(count / K).toFixed(1)}k`
  }
  return count ? count.toString() : 0
}

export const convertToFormItems = (arr: string[]) =>
  arr.map((lst) => ({ label: lst, value: lst }))
