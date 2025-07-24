function generateNumberOTP(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

function generateStringOTP(chars: string, length: number) {
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

function generateAlphanumericOTP(length: number) {
  return generateStringOTP(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    length
  )
}

function generateBase64OTP(length: number) {
  return generateStringOTP(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    length
  )
}

function generateLetterOtp(length: number) {
  return generateStringOTP(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length
  )
}

export type OTPGenerationType =
  | 'base64'
  | 'digits'
  | 'letters'
  | 'letters-upper'
  | 'letters-lower'
  | 'alphanumeric'
  | 'alphanumeric-upper'
  | 'alphanumeric-lower'

export function generateOtp(type: OTPGenerationType, length: number): string {
  if (type === 'digits') {
    return generateNumberOTP(length)
  } else if (type === 'base64') {
    return generateBase64OTP(length)
  } else if (type.startsWith('letters')) {
    const otp = generateLetterOtp(length)

    if (type === 'letters-upper') return otp.toUpperCase()
    else if (type === 'letters-lower') return otp.toLowerCase()

    return otp
  } else if (type.startsWith('alphanumeric')) {
    const otp = generateAlphanumericOTP(length)

    if (type === 'alphanumeric-upper') return otp.toUpperCase()
    else if (type === 'alphanumeric-lower') return otp.toLowerCase()

    return otp
  } else {
    throw new Error('Invalid OTP type')
  }
}
