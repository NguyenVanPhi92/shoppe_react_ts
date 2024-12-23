import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number, cb?: (value?: T) => Promise<void>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(async () => {
      setDebouncedValue(value)
      cb && (await cb(value))
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
