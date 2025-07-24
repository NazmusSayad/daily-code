import { Namespace, Socket } from '../types'
import { parseEventAndBodyAndSendFn } from './utils'

export class Client<TBody extends unknown[]> {
  body: TBody
  event: string
  space: Namespace
  socket: Socket

  #isDone = false
  get isDone() {
    return this.#isDone
  }

  #sendFn?: (...args: unknown[]) => void
  get hasSendFn() {
    return Boolean(this.#sendFn)
  }

  constructor(space: Namespace, socket: Socket, args: unknown[]) {
    const [event, body, sendFn] = parseEventAndBodyAndSendFn(args)
    this.event = event as string
    this.body = body as TBody
    this.#sendFn = (typeof sendFn === 'function' ? sendFn : undefined) as
      | ((...args: unknown[]) => void)
      | undefined
    this.space = space
    this.socket = socket
  }

  emit(...args: unknown[]) {
    this.space.emit(this.event, ...args)
  }

  return(...args: unknown[]) {
    if (this.#isDone) throw new Error('Can not send data twice!')
    this.#isDone = true
    if (this.#sendFn) this.#sendFn(...args)
  }
}
