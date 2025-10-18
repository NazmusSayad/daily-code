import { CatchHandler, FinisherHandler } from './types.type';
export * from './types.type';
/**
 * Creates a route wrapper with the given catcher and finisher.
 * @param catcher - The catcher function to handle errors.
 * @param finisher - The finisher function to handle the final result.
 * @returns A route wrapper function.
 * @example
 * ```js
 * const route = routeWrapper<[number, number], number>(
 *   (err) => {
 *     console.log('Error: 1')
 *     return err.message
 *   },
 *   (res) => {
 *     console.log({ res })
 *     return res
 *   }
 * )
 * ```
 */
export declare function routeWrapper<TParams extends unknown[], TReturn = unknown>(catcher?: CatchHandler<TParams>, finisher?: FinisherHandler<TParams, TReturn>): import("./route-core").ExecuteRoute<TParams, TReturn>;
