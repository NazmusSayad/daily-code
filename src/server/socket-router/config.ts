import { Client } from './types'

export const defaultOptions = {
  handleException(err: unknown, client: Client) {
    throw { err, client }
  },
}

export const namespaceKey = '___ socket-router.io attached ___'
