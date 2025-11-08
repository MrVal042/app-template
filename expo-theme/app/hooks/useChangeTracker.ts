import { useRef } from 'react'

export default function useChangeTracker<T>(value: T) {
  const ref = useRef<T>(value)

  const isSame = JSON.stringify(ref.current) === JSON.stringify(value)

  return { hasChanged: !isSame, previous: ref.current }
}
