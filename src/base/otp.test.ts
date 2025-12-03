import { describe, expect, it } from 'vitest'
import { generateOtp } from './otp'

describe('generateOtp', () => {
  it('should generate digits OTP of correct length', () => {
    const otp = generateOtp('digits', 6)
    expect(otp.length).toBe(6)
    expect(/^[0-9]+$/.test(otp)).toBe(true)
  })
  it('should generate base64 OTP', () => {
    const otp = generateOtp('base64', 8)
    expect(otp.length).toBe(8)
    expect(/^[A-Za-z0-9+/]+$/.test(otp)).toBe(true)
  })
  it('should generate letters-upper OTP', () => {
    const otp = generateOtp('letters-upper', 5)
    expect(otp.length).toBe(5)
    expect(/^[A-Z]+$/.test(otp)).toBe(true)
  })
  it('should generate alphanumeric-lower OTP', () => {
    const otp = generateOtp('alphanumeric-lower', 7)
    expect(otp.length).toBe(7)
    expect(/^[a-z0-9]+$/.test(otp)).toBe(true)
  })
  it('should throw for invalid type', () => {
    // @ts-expect-error Testing invalid type for error handling
    expect(() => generateOtp('bad', 4)).toThrow()
  })
})
