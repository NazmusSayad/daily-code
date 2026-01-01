import { useEffect, useState } from 'react'
import { useEffectExceptOnMount } from './use-effect-except-on-mount'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key)
      if (item) return JSON.parse(item)
    }

    return initialValue
  })

  useEffect(() => {
    const item = localStorage.getItem(key)
    if (item) setValue(JSON.parse(item))
  }, [key])

  useEffectExceptOnMount(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
