export type RouteOptions<TParams extends unknown[], TReturn = unknown> = {
    middlewares?: RouteHandler<TParams>[];
    catcher?: CatchHandler<TParams>;
    finisher?: FinisherHandler<TParams, TReturn>;
};
export type RouteHandler<TParams extends unknown[]> = (...args: TParams) => void | Promise<void>;
export type CatchHandler<TParams extends unknown[]> = (err: Error, ...args: TParams) => unknown;
export type FinisherHandler<TParams extends unknown[], TReturn = unknown> = (data: Exclude<TReturn | void, Error>, ...args: TParams) => unknown;
