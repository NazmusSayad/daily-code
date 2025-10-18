/**
 * The available OTP generation types.
 */
export type OTPGenerationType = 'base64' | 'digits' | 'letters' | 'letters-upper' | 'letters-lower' | 'alphanumeric' | 'alphanumeric-upper' | 'alphanumeric-lower';
/**
 * Generates a one-time password (OTP) of the specified type and length.
 * @param type The OTP generation type
 * @param length The length of the OTP
 * @returns The generated OTP string
 * @throws {Error} If the OTP type is invalid
 */
export declare function generateOtp(type: OTPGenerationType, length: number): string;
