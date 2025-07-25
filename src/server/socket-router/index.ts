import { Router } from './core'

export * from './types'
export { Router as SocketIoRouter }

/**
 * Create a new Socket.IO router
 * @returns {Router} A new Socket.IO router
 */
export function createSocketIoRouter() {
  return new Router()
}
