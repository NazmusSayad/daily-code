import { Controller, HandlersMap, Namespace, OptionsPartial } from '../types';
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
export declare class Router {
    #private;
    static create(): Router;
    get store(): HandlersMap;
    connect(namespace: Namespace, options?: OptionsPartial): void;
    on(path: string, ...handlers: (Controller | Router)[]): void;
    use(...handlers: (Controller | Router)[]): void;
}
