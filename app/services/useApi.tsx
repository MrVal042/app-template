import { useApp } from '@hooks'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

type ErrorType = unknown

type IProps = {
  error?: ErrorType
  successEffect?: () => void
  errorEffect?: (x: {
    message?: string
    code?: string
    status?: number
  }) => void
  isLoading?: boolean
  isSuccess?: boolean
  toastErr?: boolean
  successMsg?: string
  isError?: boolean
}

export default function useApi({
  toastErr = true,
  successEffect,
  errorEffect,
  successMsg,
  isLoading,
  isSuccess,
  isError,
  error,
}: IProps) {
  const { setToast } = useApp()
  useEffect(() => {
    if (isLoading) return
    if (isSuccess) {
      successEffect?.()
      successMsg &&
        setToast({
          title: 'Success',
          message: successMsg,
          type: 'success',
        })
    }
    if (isError || error) {
      let message = 'An unexpected error occurred.'
      let code = ''
      let status = 0

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
      } else if (error instanceof Error) {
        message = error.message
      }
      errorEffect?.({ message, code, status })
      if (toastErr) {
        toastErr &&
          setToast({
            title: 'Error occurred',
            type: 'error',
            message,
          })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isLoading, toastErr, isSuccess])
}
