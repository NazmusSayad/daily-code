import {
  CatchHandler,
  FinisherHandler,
  RouteHandler,
  RouteOptions,
} from './types.type'

export function routeCore<TParams extends unknown[], TReturn>(
  options: RouteOptions<TParams, TReturn>
): ExecuteRoute<TParams, TReturn> {
  function executeRoute(
    ...handlers: RouteHandler<TParams>[]
  ): (...args: TParams) => Promise<unknown> {
    const totalHandlers = [...(options.middlewares ?? []), ...handlers]
    return async function (...args: TParams): Promise<unknown> {
      try {
        for (const handler of totalHandlers) {
          let response = handler(...args)
          while (response instanceof Promise) response = await response
        }
        console.warn('No response from handlers')
      } catch (exception) {
        let resolvedException = exception
        while (resolvedException instanceof Promise)
          resolvedException = await resolvedException
        if (resolvedException instanceof Error) {
          if (!options.catcher) throw resolvedException
          return options.catcher(resolvedException, ...args)
        }
        if (!options.finisher) return resolvedException
        return options.finisher(
          resolvedException as Exclude<TReturn | void, Error>,
          ...args
        )
      }
    }
  }

  function create<
    TInnerParams extends unknown[] = TParams,
    TInnerReturn = TReturn,
  >(
    catcher?: CatchHandler<TInnerParams>,
    finisher?: FinisherHandler<TInnerParams, TInnerReturn>
  ): ExecuteRoute<TInnerParams, TInnerReturn> {
    return routeCore<TInnerParams, TInnerReturn>({
      ...(options as unknown as RouteOptions<TInnerParams, TInnerReturn>),
      catcher:
        catcher ?? (options.catcher as CatchHandler<TInnerParams> | undefined),
      finisher:
        finisher ??
        (options.finisher as
          | FinisherHandler<TInnerParams, TInnerReturn>
          | undefined),
      middlewares: [
        ...(options.middlewares ?? []),
      ] as unknown as RouteHandler<TInnerParams>[],
    })
  }

  function use<TH extends RouteHandler<TParams>[] = RouteHandler<TParams>[]>(
    ...handlers: TH
  ): ExecuteRoute<TParams, TReturn> {
    return routeCore<TParams, TReturn>({
      ...options,
      middlewares: [...(options.middlewares ?? []), ...handlers],
    })
  }

  const exec: ExecuteRoute<TParams, TReturn> = Object.assign(executeRoute, {
    create,
    use,
  })

  return exec
}

export type ExecuteRoute<TParams extends unknown[], TReturn> = {
  (...handlers: RouteHandler<TParams>[]): (...args: TParams) => Promise<unknown>
  create<TInnerParams extends unknown[] = TParams, TInnerReturn = TReturn>(
    catcher?: CatchHandler<TInnerParams>,
    finisher?: FinisherHandler<TInnerParams, TInnerReturn>
  ): ExecuteRoute<TInnerParams, TInnerReturn>
  use<THandlers extends RouteHandler<TParams>[] = RouteHandler<TParams>[]>(
    ...handlers: THandlers
  ): ExecuteRoute<TParams, TReturn>
}
