import * as React from 'react';
export declare const AuthProvider: {
    ({ children, ...props }: React.PropsWithChildren<object>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
}, useAuth: () => {
    readonly name: string;
    readonly age: number;
    readonly setName: React.Dispatch<React.SetStateAction<string>>;
    readonly setAge: React.Dispatch<React.SetStateAction<number>>;
}, ctx: React.Context<NoInfer<{
    readonly name: string;
    readonly age: number;
    readonly setName: React.Dispatch<React.SetStateAction<string>>;
    readonly setAge: React.Dispatch<React.SetStateAction<number>>;
}> | undefined>;
export declare function useGetAuth(): {
    name: string;
    age: number;
};
export declare function App({}: {}): import("react/jsx-runtime").JSX.Element;
