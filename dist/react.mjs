import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Component, useRef, useEffect, useState } from 'react';

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
function createContext(useValue, options) {
    const displayName = options?.displayName ?? 'Daily Code / React Context';
    const nativeContext = React.createContext(options?.initialValue);
    nativeContext.displayName = displayName;
    function useContext() {
        if (options?.useContextHandler) {
            return options.useContextHandler(nativeContext);
        }
        const context = React.useContext(nativeContext);
        if (options?.useContext) {
            return options.useContext(context);
        }
        if (context === undefined) {
            throw new Error(`${displayName}: Used outside of its provider`);
        }
        return context;
    }
    function ContextProvider({ children, ...props }) {
        const providerValue = useValue(props);
        const providerChildren = options?.useProvider
            ? options.useProvider(children, providerValue)
            : children;
        return (jsx(nativeContext.Provider, { value: providerValue, children: providerChildren }));
    }
    ContextProvider.displayName = `${displayName} Provider`;
    return [ContextProvider, useContext, nativeContext];
}

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
function createReactSuspense(promise) {
    let isPromiseResolved = false;
    let promiseData;
    let promiseError;
    function handlePromise(promise) {
        if (!isPromiseResolved) {
            isPromiseResolved = true;
            promise
                .then((res) => (promiseData = res))
                .catch((err) => (promiseError = err));
            throw promise;
        }
        return [promiseData, promiseError];
    }
    function handleRootPromise() {
        return handlePromise(promise);
    }
    return (promise ? handleRootPromise : handlePromise);
}

/**
 * React error boundary component for catching and displaying errors in the component tree.
 *
 * @example
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }
    render() {
        const { children, fallback } = this.props;
        const { error, errorInfo } = this.state;
        if (!error)
            return children;
        if (typeof fallback === 'function') {
            return fallback(error, errorInfo);
        }
        return fallback;
    }
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
function useEffectExceptOnMount(effect, dependencies) {
    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) {
            const unmount = effect();
            return typeof unmount === 'function' ? unmount : undefined;
        }
        else {
            mounted.current = true;
        }
    }, dependencies);
    useEffect(() => {
        return () => {
            mounted.current = false;
        };
    }, []);
}

function useEffectState(initialValue, deps) {
    const [state, setState] = useState(initialValue);
    const dependency = Array.isArray(deps) ? deps : [initialValue];
    useEffect(() => {
        setState(initialValue);
    }, dependency);
    return [state, setState];
}

/**
 * React Suspense utility hook. Throws a promise when suspended is true, triggering a Suspense boundary.
 *
 * @param suspended If true, throws a promise to suspend rendering
 *
 * @example
 * useSuspense(isLoading)
 */
function useSuspense(suspended = false) {
    const promise = useRef(undefined);
    if (suspended && !promise.current) {
        throw new Promise((resolve) => {
            promise.current = { resolve };
        });
    }
    if (!suspended && promise.current) {
        promise.current.resolve();
        promise.current = undefined;
    }
}

export { ErrorBoundary, createContext, createReactSuspense, useEffectExceptOnMount, useEffectState, useSuspense };
