import { DependencyList, useEffect, useState } from 'react'

export function useEffectState<T>(initialValue: T, deps?: DependencyList) {
  const [state, setState] = useState(initialValue)

  const dependency = Array.isArray(deps) ? deps : [initialValue]

  useEffect(() => {
    setState(initialValue)
  }, dependency)

  return [state, setState] as const
}
