import * as React from 'react'

export type CreateContextOptions<TOutput> = {
  displayName?: string
  initialValue?: NoInfer<TOutput>

  useContextHook?: (context: NoInfer<TOutput> | undefined) => NoInfer<TOutput>

  useChildrenProvider?: (
    children: React.ReactNode | undefined,
    value: NoInfer<TOutput>
  ) => React.ReactNode
}

/**
 * @description Create a context with very easy to use hook
 *
 * @example
 * ```tsx
 * const [CounterProvider, useCounter] = createContext(() => {
 *   const [count, setCount] = useState(0)
 *
 *   return {
 *    count,
 *    setCount,
 *   }
 * })
 *
 * function App() {
 *   return (
 *     <CounterProvider>
 *       <Counter />
 *     </CounterProvider>
 *   )
 * }
 *
 * function Counter() {
 *   const { count, setCount } = useCounter()
 *   return <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
 * }
 * ```
 */
export function createContext<const TInput extends object, const TOutput>(
  useValue: (props: TInput) => TOutput,
  options?: CreateContextOptions<NoInfer<TOutput>>
) {
  const displayName = options?.displayName ?? 'Daily Code / React Context'

  const nativeContext = React.createContext(options?.initialValue)
  nativeContext.displayName = displayName

  function useContextHook() {
    const context = React.useContext(nativeContext)

    if (options?.useContextHook) {
      return options.useContextHook(context)
    }

    if (context === undefined) {
      throw new Error(`${displayName}: Used outside of its provider`)
    }

    return context
  }

  function ContextProvider({
    children,
    ...props
  }: React.PropsWithChildren<NoInfer<TInput>>) {
    const value = useValue(props as NoInfer<TInput>)

    return (
      <nativeContext.Provider value={value}>
        {options?.useChildrenProvider
          ? options.useChildrenProvider(children, value)
          : children}
      </nativeContext.Provider>
    )
  }

  ContextProvider.displayName = `${displayName} Provider`

  return [ContextProvider, useContextHook, nativeContext] as const
}
