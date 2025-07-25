import { Client, HandlersEntries, HandlersList, Options } from '../types'

export function socketHandler(
  entries: HandlersEntries,
  client: Client,
  conf: Options
): void {
  const next = entries.next()
  if (next.done) return
  const [config, handler] = next.value as HandlersList

  if (config.event && config.event !== client.event) {
    return socketHandler(entries, client, conf)
  }

  try {
    const rv = handler(client, (err: unknown) => {
      if (err == null) socketHandler(entries, client, conf)
      else conf.handleException(err, client)
    })

    if (rv instanceof Promise) {
      rv.catch((err) => conf.handleException(err, client))
    }
  } catch (err) {
    conf.handleException(err, client)
  }
}
