import * as React from 'react'
import { PrettifyRecord } from './utils.type'

export type CreateContextOptions<TOutput> = {
  displayName?: string
  initialValue?: TOutput

  useProvider?: (children: React.ReactNode, props: TOutput) => React.ReactNode

  useContext?: (
    context: NoInfer<TOutput> | undefined
  ) => PrettifyRecord<TOutput>

  useContextHandler?: (
    context: React.Context<TOutput | undefined>
  ) => PrettifyRecord<TOutput>
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
  type PrettifiedOutput = PrettifyRecord<NoInfer<TOutput>>
  const displayName = options?.displayName ?? 'Daily Code / React Context'

  const nativeContext = React.createContext(options?.initialValue)
  nativeContext.displayName = displayName

  function useContext(): PrettifiedOutput {
    if (options?.useContextHandler) {
      return options.useContextHandler(nativeContext)
    }

    const context = React.useContext(nativeContext)

    if (options?.useContext) {
      return options.useContext(context)
    }

    if (context === undefined) {
      throw new Error(`${displayName}: Used outside of its provider`)
    }

    return context as PrettifiedOutput
  }

  function ContextProvider({
    children,
    ...props
  }: React.PropsWithChildren<TInput>) {
    const providerValue = useValue(props as TInput)

    const providerChildren = options?.useProvider
      ? options.useProvider(children, providerValue)
      : children

    return (
      <nativeContext.Provider value={providerValue}>
        {providerChildren}
      </nativeContext.Provider>
    )
  }

  ContextProvider.displayName = `${displayName} Provider`

  return [ContextProvider, useContext, nativeContext] as const
}
