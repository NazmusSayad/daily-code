import { Socket as Socket$1, Namespace as Namespace$1 } from 'socket.io';

type RouteOptions<TParams extends unknown[], TReturn = unknown> = {
    middlewares?: RouteHandler<TParams>[];
    catcher?: CatchHandler<TParams>;
    finisher?: FinisherHandler<TParams, TReturn>;
};
type RouteHandler<TParams extends unknown[]> = (...args: TParams) => void | Promise<void>;
type CatchHandler<TParams extends unknown[]> = (err: Error, ...args: TParams) => unknown;
type FinisherHandler<TParams extends unknown[], TReturn = unknown> = (data: Exclude<TReturn | void, Error>, ...args: TParams) => unknown;

type ExecuteRoute<TParams extends unknown[], TReturn> = {
    (...handlers: RouteHandler<TParams>[]): (...args: TParams) => Promise<unknown>;
    create<TInnerParams extends unknown[] = TParams, TInnerReturn = TReturn>(catcher?: CatchHandler<TInnerParams>, finisher?: FinisherHandler<TInnerParams, TInnerReturn>): ExecuteRoute<TInnerParams, TInnerReturn>;
    use<THandlers extends RouteHandler<TParams>[] = RouteHandler<TParams>[]>(...handlers: THandlers): ExecuteRoute<TParams, TReturn>;
};

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
declare function routeWrapper<TParams extends unknown[], TReturn = unknown>(catcher?: CatchHandler<TParams>, finisher?: FinisherHandler<TParams, TReturn>): ExecuteRoute<TParams, TReturn>;

type Socket = Socket$1;
type Namespace = Namespace$1;
type Client$1<TBody extends unknown[] = unknown[]> = Client<TBody>;
type OptionsPartial = Partial<Options>;
interface Options {
    handleException(err: unknown, client: Client$1): void;
}
type HandlersMap = Map<RouteConfig, Controller>;
type HandlersList = [RouteConfig, Controller];
type HandlersEntries = IterableIterator<HandlersList>;
interface RouteConfig {
    event?: string;
}
type Controller<TBody extends unknown[] = unknown[]> = (client: Client$1<TBody>, next: (err?: unknown) => void) => void | Promise<void>;

declare class Client<TBody extends unknown[]> {
    #private;
    body: TBody;
    event: string;
    space: Namespace;
    socket: Socket;
    get isDone(): boolean;
    get hasSendFn(): boolean;
    constructor(space: Namespace, socket: Socket, args: unknown[]);
    emit(...args: unknown[]): void;
    return(...args: unknown[]): void;
}

/**
 * Socket.IO router
 * @class Router
 * @description A Socket.IO router
 * @example
 * const router = new Router()
 * router.on('connect', (socket) => {
 *  console.log('connected')
 * })
 * router.on('message', (socket) => {
 *  console.log('message')
 * })
 * router.on('disconnect', (socket) => {
 *  console.log('disconnected')
 * })
 * router.connect(io, {
 *  handleException: (err, client) => {
 *    console.error(err)
 *  }
 * })
 */
declare class Router {
    #private;
    static create(): Router;
    get store(): HandlersMap;
    connect(namespace: Namespace, options?: OptionsPartial): void;
    on(path: string, ...handlers: (Controller | Router)[]): void;
    use(...handlers: (Controller | Router)[]): void;
}

/**
 * Create a new Socket.IO router
 * @returns {Router} A new Socket.IO router
 */
declare function createSocketIoRouter(): Router;

export { Router as SocketIoRouter, createSocketIoRouter, routeWrapper };
export type { CatchHandler, Client$1 as Client, Controller, FinisherHandler, HandlersEntries, HandlersList, HandlersMap, Namespace, Options, OptionsPartial, RouteConfig, RouteHandler, RouteOptions, Socket };
