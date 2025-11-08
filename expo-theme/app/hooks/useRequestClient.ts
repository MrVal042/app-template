
import { hybridStorage, useAuth } from '@store'
import { QueryCache, QueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

const useRequestClient = () => {
  const { logout } = useAuth()
  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: async (error) => {
            if (shouldLogout(error as unknown as LogoutError)) {
              logout()
            await hybridStorage.clearAll()
            queryClient.clear()
            }
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            // cacheTime : 1000 * 250 * 60, //cache expires in 250 minutes
            staleTime: 1000 * 0.5 * 60, //fetch new records every 0.5 minutes for stale records.
            retry: (failedCount, error) => {
              const logoutError = error as unknown as LogoutError
              if (logoutError?.status === 401 || logoutError?.status === 404) {
                return false
              }
              if (failedCount > 2) {
                return false
              }
              return true
            },
          },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return queryClient
}

interface LogoutError {
  status?: number
  msg?: string
  [key: string]: unknown
}

const shouldLogout = (error: LogoutError): boolean =>
  error?.status === 401 ||
  error?.msg === 'Token not found' ||
  error?.msg === 'Token not found, maybe expired'

export default useRequestClient
