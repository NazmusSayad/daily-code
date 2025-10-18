import { Component, ErrorInfo, ReactNode } from 'react';
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
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): ReactNode;
}
export {};
