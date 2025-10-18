import { CatchHandler, FinisherHandler, RouteHandler, RouteOptions } from './types.type';
export declare function routeCore<TParams extends unknown[], TReturn>(options: RouteOptions<TParams, TReturn>): ExecuteRoute<TParams, TReturn>;
export type ExecuteRoute<TParams extends unknown[], TReturn> = {
    (...handlers: RouteHandler<TParams>[]): (...args: TParams) => Promise<unknown>;
    create<TInnerParams extends unknown[] = TParams, TInnerReturn = TReturn>(catcher?: CatchHandler<TInnerParams>, finisher?: FinisherHandler<TInnerParams, TInnerReturn>): ExecuteRoute<TInnerParams, TInnerReturn>;
    use<THandlers extends RouteHandler<TParams>[] = RouteHandler<TParams>[]>(...handlers: THandlers): ExecuteRoute<TParams, TReturn>;
};
