import { DependencyList } from 'react';
export declare function useEffectState<T>(initialValue: T, deps?: DependencyList): readonly [T, import("react").Dispatch<import("react").SetStateAction<T>>];
