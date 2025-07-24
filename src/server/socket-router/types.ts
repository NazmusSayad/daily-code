import { Namespace as RawNamespace, Socket as RawSocket } from 'socket.io'
import { Client as RawClient } from './core/client'

export type Socket = RawSocket
export type Namespace = RawNamespace
export type Client<TBody extends unknown[] = unknown[]> = RawClient<TBody>

export type OptionsPartial = Partial<Options>
export interface Options {
  handleException(err: unknown, client: Client): void
}

export type HandlersMap = Map<RouteConfig, Controller>
export type HandlersList = [RouteConfig, Controller]
export type HandlersEntries = IterableIterator<HandlersList>

export interface RouteConfig {
  event?: string
}

export type Controller<TBody extends unknown[] = unknown[]> = (
  client: Client<TBody>,
  next: (err?: unknown) => void
) => void | Promise<void>
