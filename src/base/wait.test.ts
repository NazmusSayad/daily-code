import { describe, expect, it } from 'vitest'
import { wait } from './wait'

describe('wait', () => {
  it('should resolve after ~50ms', async () => {
    const start = Date.now()
    await wait(50)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(45)
  })
  it('should resolve after 0ms if duration is 0', async () => {
    const start = Date.now()
    await wait(0)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(0)
  })
  it('should resolve after 0ms if duration is undefined', async () => {
    const start = Date.now()
    await wait()
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(0)
  })
})
