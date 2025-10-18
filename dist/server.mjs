import { Namespace } from 'socket.io';

function routeCore(options) {
    function executeRoute(...handlers) {
        const totalHandlers = [...(options.middlewares ?? []), ...handlers];
        return async function (...args) {
            try {
                for (const handler of totalHandlers) {
                    let response = handler(...args);
                    while (response instanceof Promise)
                        response = await response;
                }
                console.warn('No response from handlers');
            }
            catch (exception) {
                let resolvedException = exception;
                while (resolvedException instanceof Promise)
                    resolvedException = await resolvedException;
                if (resolvedException instanceof Error) {
                    if (!options.catcher)
                        throw resolvedException;
                    return options.catcher(resolvedException, ...args);
                }
                if (!options.finisher)
                    return resolvedException;
                return options.finisher(resolvedException, ...args);
            }
        };
    }
    function create(catcher, finisher) {
        return routeCore({
            ...options,
            catcher: catcher ?? options.catcher,
            finisher: finisher ??
                options.finisher,
            middlewares: [
                ...(options.middlewares ?? []),
            ],
        });
    }
    function use(...handlers) {
        return routeCore({
            ...options,
            middlewares: [...(options.middlewares ?? []), ...handlers],
        });
    }
    const exec = Object.assign(executeRoute, {
        create,
        use,
    });
    return exec;
}

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
function routeWrapper(catcher, finisher) {
    return routeCore({ catcher: catcher, finisher });
}

const defaultOptions = {
    handleException(err, client) {
        throw { err, client };
    },
};
const namespaceKey = '___ socket-router.io attached ___';

function checkNamespace(namespace) {
    if (!(namespace instanceof Namespace)) {
        throw new Error('First argument must be a namespace');
    }
    if (namespace[namespaceKey]) {
        throw new Error('Another router attached with this namespace');
    }
    Object.defineProperty(namespace, namespaceKey, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false,
    });
}
function parseEventAndBodyAndSendFn(rawArgs) {
    const [event, ...args] = rawArgs;
    const lastElement = args[args.length - 1];
    return lastElement instanceof Function
        ? [event, args.slice(0, -1), lastElement]
        : [event, args];
}

class Client {
    body;
    event;
    space;
    socket;
    #isDone = false;
    get isDone() {
        return this.#isDone;
    }
    #sendFn;
    get hasSendFn() {
        return Boolean(this.#sendFn);
    }
    constructor(space, socket, args) {
        const [event, body, sendFn] = parseEventAndBodyAndSendFn(args);
        this.event = event;
        this.body = body;
        this.#sendFn = (typeof sendFn === 'function' ? sendFn : undefined);
        this.space = space;
        this.socket = socket;
    }
    emit(...args) {
        this.space.emit(this.event, ...args);
    }
    return(...args) {
        if (this.#isDone)
            throw new Error('Can not send data twice!');
        this.#isDone = true;
        if (this.#sendFn)
            this.#sendFn(...args);
    }
}

function socketHandler(entries, client, conf) {
    const next = entries.next();
    if (next.done)
        return;
    const [config, handler] = next.value;
    if (config.event && config.event !== client.event) {
        return socketHandler(entries, client, conf);
    }
    try {
        const rv = handler(client, (err) => {
            if (err == null)
                socketHandler(entries, client, conf);
            else
                conf.handleException(err, client);
        });
        if (rv instanceof Promise) {
            rv.catch((err) => conf.handleException(err, client));
        }
    }
    catch (err) {
        conf.handleException(err, client);
    }
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
class Router {
    static create() {
        return new Router();
    }
    #store = new Map();
    #addRouter(path, router) {
        const store = [...router.store];
        store.forEach(([key, handler]) => {
            const newEvent = path + key.event;
            this.#store.set({ ...key, event: newEvent }, handler);
        });
    }
    #addCallback(path, cb) {
        this.#store.set({ event: path }, cb);
    }
    get store() {
        return this.#store;
    }
    connect(namespace, options) {
        checkNamespace(namespace);
        const config = options ? { ...defaultOptions, ...options } : defaultOptions;
        namespace.on('connect', (socket) => {
            socket.onAny((...args) => {
                const entries = this.#store.entries();
                const client = new Client(namespace, socket, args);
                socketHandler(entries, client, config);
            });
        });
    }
    on(path, ...handlers) {
        handlers.forEach((handler) => {
            if (handler instanceof Router) {
                this.#addRouter(path, handler);
            }
            else {
                this.#addCallback(path, handler);
            }
        });
    }
    use(...handlers) {
        this.on('', ...handlers);
    }
}

/**
 * Create a new Socket.IO router
 * @returns {Router} A new Socket.IO router
 */
function createSocketIoRouter() {
    return new Router();
}

export { Router as SocketIoRouter, createSocketIoRouter, routeWrapper };
