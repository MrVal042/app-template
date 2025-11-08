import { useEffect } from 'react'
import useApp from './useApp'
import { handleError } from '@utils'
import { AxiosError } from 'axios'

type ApiProps = {
  onError?: (err: AxiosError) => void
  enableToastErr?: 'dev' | 'all'
  onSuccess?: () => void
  reset?: () => void
  error?: AxiosError
  toastTitle?: string
  isSuccess?: boolean
  isLoading?: boolean
  successMsg?: string
  isError?: boolean
  // toggle reporting (Sentry etc)
  report?: boolean
  src?: string
}

export default function useApi({
  enableToastErr = 'dev',
  successMsg,
  toastTitle,
  onSuccess,
  isLoading,
  isSuccess,
  onError,
  isError,
  report,
  reset,
  error,
  src,
}: ApiProps) {
  const { setToast } = useApp()

  useEffect(() => {
    if (isLoading) return
    if (isSuccess) {
      onSuccess?.()
      successMsg &&
        setToast({
          title: 'Success',
          message: successMsg,
          type: 'success',
        })
    }
    if (isError || error) {
      const handler = async () => {
        const err = await handleError({
          report,
          error,
          src: src || toastTitle,
        })
        onError?.(err as AxiosError)
        if (enableToastErr) {
          if (enableToastErr) {
            // derive short title from url if not provided
            setToast({
              title: `${toastTitle || 'Request'} Failed`,
              message: err?.message as string,
              type: 'error',
            })
          }
        }
        reset?.()
      }
      handler()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isLoading, isSuccess])
}
