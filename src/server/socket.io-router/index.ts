import { Router } from './core'

export { Router as SocketIoRouter }
export * from './types'

/**
 * Create a new Socket.IO router
 * @returns {Router} A new Socket.IO router
 */
export function createSocketIoRouter() {
  return new Router()
}
