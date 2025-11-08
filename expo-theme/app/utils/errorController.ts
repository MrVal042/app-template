import { AxiosError } from 'axios'

export const handleError = (error: unknown) => {
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
