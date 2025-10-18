import * as react_jsx_runtime from 'react/jsx-runtime';
import { PrettifyRecord } from './types.js';
import * as React from 'react';
import { Component, ReactNode, ErrorInfo, EffectCallback, DependencyList } from 'react';

type CreateContextOptions<TOutput> = {
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
declare function createContext<const TInput extends object, const TOutput>(useValue: (props: TInput) => TOutput, options?: CreateContextOptions<NoInfer<TOutput>>): readonly [{
    ({ children, ...props }: React.PropsWithChildren<TInput>): react_jsx_runtime.JSX.Element;
    displayName: string;
}, () => PrettifyRecord<NoInfer<TOutput>>, React.Context<NoInfer<TOutput> | undefined>];

/**
 * Creates a React Suspense handler for promises, allowing you to throw a promise to trigger React Suspense boundaries.
 *
 * @template T The resolved type of the promise
 * @param promise Optional promise to be handled by the suspense boundary
 * @returns A function to handle promises for Suspense, or the result/error tuple if promise is provided
 *
 * @example
 * // Usage with a promise
 * const [data, error] = createReactSuspense(fetchData())
 *
 * // Usage as a handler
 * const handleSuspense = createReactSuspense()
 * const [data, error] = handleSuspense(fetchData())
 */
declare function createReactSuspense<T = void>(promise?: Promise<T>): T extends void ? <P extends Promise<unknown>>(promise: P) => [Awaited<P>, unknown] : () => [T, unknown];

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode);
}
interface ErrorBoundaryState {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
/**
 * React error boundary component for catching and displaying errors in the component tree.
 *
 * @example
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <App />
 * </ErrorBoundary>
 */
declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): ReactNode;
}

/**
 * Like React's useEffect, but skips running the effect on the initial mount.
 *
 * @param effect Effect callback (same as useEffect)
 * @param dependencies Dependency list (same as useEffect)
 *
 * @example
 * useEffectExceptOnMount(() => {
 *   // Will not run on mount, only on updates
 *   console.log('Updated!')
 * }, [value])
 */
declare function useEffectExceptOnMount(effect: EffectCallback, dependencies: DependencyList): void;

declare function useEffectState<T>(initialValue: T, deps?: DependencyList): readonly [T, React.Dispatch<React.SetStateAction<T>>];

/**
 * React Suspense utility hook. Throws a promise when suspended is true, triggering a Suspense boundary.
 *
 * @param suspended If true, throws a promise to suspend rendering
 *
 * @example
 * useSuspense(isLoading)
 */
declare function useSuspense(suspended?: boolean): void;

export { ErrorBoundary, createContext, createReactSuspense, useEffectExceptOnMount, useEffectState, useSuspense };
export type { CreateContextOptions };
