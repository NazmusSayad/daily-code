import { defaultOptions } from '../config'
import { Controller, HandlersMap, Namespace, OptionsPartial } from '../types'
import { Client } from './client'
import { socketHandler } from './socket-handler'
import { checkNamespace } from './utils'

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
export class Router {
  static create() {
    return new Router()
  }

  #store = new Map() as HandlersMap

  #addRouter(path: string, router: Router) {
    const store = [...router.store]
    store.forEach(([key, handler]) => {
      const newEvent = path + key.event
      this.#store.set({ ...key, event: newEvent }, handler)
    })
  }

  #addCallback(path: string, cb: Controller) {
    this.#store.set({ event: path }, cb)
  }

  get store() {
    return this.#store
  }

  connect(namespace: Namespace, options?: OptionsPartial) {
    checkNamespace(namespace)
    const config = options ? { ...defaultOptions, ...options } : defaultOptions

    namespace.on('connect', (socket) => {
      socket.onAny((...args: any[]) => {
        const entries = this.#store.entries()
        const client = new Client(namespace, socket, args)
        socketHandler(entries, client, config)
      })
    })
  }

  on(path: string, ...handlers: (Controller | Router)[]) {
    handlers.forEach((handler) => {
      handler instanceof Router
        ? this.#addRouter(path, handler)
        : this.#addCallback(path, handler)
    })
  }

  use(...handlers: (Controller | Router)[]) {
    this.on('', ...handlers)
  }
}
