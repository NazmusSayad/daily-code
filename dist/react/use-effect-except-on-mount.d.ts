import { DependencyList, EffectCallback } from 'react';
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
export declare function useEffectExceptOnMount(effect: EffectCallback, dependencies: DependencyList): void;
