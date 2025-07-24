import {
  CatchHandler,
  FinisherHandler,
  RouteHandler,
  RouteOptions,
} from './types.type'

export function routeCore<TParams extends unknown[], TReturn>(
  options: RouteOptions<TParams, TReturn>
) {
  const ExecuteRoute: ExecuteRoute<TParams, TReturn> = function (...handlers) {
    const totalHandlers = [...(options.middlewares ?? []), ...handlers]

    return async function (...args) {
      try {
        for (const handler of totalHandlers) {
          let response = handler(...args)
          while (response instanceof Promise) response = await response
        }

        console.warn('No response from handlers')
      } catch (exception: any) {
        try {
          while (exception instanceof Promise) exception = await exception
          throw exception
        } catch (resolvedException) {
          if (resolvedException instanceof Error) {
            if (!options.catcher) throw resolvedException
            return options.catcher(resolvedException, ...args)
          }
        }

        if (!options.finisher) return exception
        return options.finisher(exception, ...args)
      }
    }
  }

  ExecuteRoute.create = function (catcher, finisher) {
    return routeCore({
      ...options,
      catcher: catcher ?? options.catcher,
      finisher: finisher ?? options.finisher,
      middlewares: [...(options.middlewares ?? [])],
    })
  }

  ExecuteRoute.use = function (...handlers) {
    return routeCore({
      ...options,
      middlewares: [...(options.middlewares ?? []), ...handlers],
    })
  }

  return ExecuteRoute
}

export type ExecuteRoute<TParams extends unknown[], TReturn> = {
  (...handlers: RouteHandler<TParams>[]): (...args: TParams) => Promise<unknown>

  create<TInnerParams extends unknown[] = TParams, TInnerReturn = TReturn>(
    catcher?: CatchHandler<TInnerParams>,
    finisher?: FinisherHandler<TInnerParams, TInnerReturn>
  ): ExecuteRoute<TInnerParams, TInnerReturn>

  use<THandlers extends RouteHandler<TParams>[]>(
    ...handlers: THandlers
  ): ExecuteRoute<TParams, TReturn>
}
