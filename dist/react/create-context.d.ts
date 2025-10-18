import { PrettifyRecord } from '@/types';
import * as React from 'react';
export type CreateContextOptions<TOutput> = {
    displayName?: string;
    initialValue?: TOutput;
    useProvider?: (children: React.ReactNode, props: TOutput) => React.ReactNode;
    useContext?: (context: NoInfer<TOutput> | undefined) => PrettifyRecord<TOutput>;
    useContextHandler?: (context: React.Context<TOutput | undefined>) => PrettifyRecord<TOutput>;
};
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
export declare function createContext<const TInput extends object, const TOutput>(useValue: (props: TInput) => TOutput, options?: CreateContextOptions<NoInfer<TOutput>>): readonly [{
    ({ children, ...props }: React.PropsWithChildren<TInput>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
}, () => PrettifyRecord<NoInfer<TOutput>>, React.Context<NoInfer<TOutput> | undefined>];
