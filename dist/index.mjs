export { h as hexToRGB } from './hex-to-rgb-Bv8HmjOn.js';

/**
 * Creates an array of numbers from start (inclusive) to end (exclusive).
 * @param start The starting number (inclusive)
 * @param end The ending number (exclusive)
 * @returns An array of numbers from start to end - 1
 */
function numberRange(start, end) {
    return Array.from({ length: end - start }, (_, i) => start + i);
}
/**
 * Returns a new array with the elements shuffled randomly.
 * @param arr The array to shuffle
 * @returns A new shuffled array
 */
function arrayShuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}
/**
 * Splits an array into chunks of the specified size.
 * @param arr The array to chunk
 * @param size The size of each chunk
 * @returns An array of array chunks
 */
function arrayChunk(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
}
/**
 * Partitions an array into two arrays based on a predicate function.
 * @param arr The array to partition
 * @param predicate The function to test each element
 * @returns A tuple: [elements passing predicate, elements failing predicate]
 */
function arrayPartition(arr, predicate) {
    const pass = [];
    const fail = [];
    for (const item of arr)
        (predicate(item) ? pass : fail).push(item);
    return [pass, fail];
}

/**
 * Generates a random integer between min and max (inclusive).
 * @param max Maximum value (default: 1)
 * @param min Minimum value (default: 0)
 * @returns Random integer between min and max
 * @example
 *   randomNumber(10, 5) // 5, 6, 7, 8, 9, or 10
 */
function randomNumber(max = 1, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * Parses a string or number to a number, supporting 'px' units.
 * @param value The value to parse (string or number)
 * @returns The parsed number, or null if invalid
 */
function getSizeAsNumber(value) {
    if (typeof value === 'number')
        return value;
    const floatValue = parseFloat(value);
    if (isNaN(floatValue))
        return null;
    if (value.endsWith('px'))
        return floatValue;
    if (String(floatValue) === value)
        return floatValue;
    return null;
}
/**
 * Clamps a number between a minimum and maximum value.
 * @param num The number to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped number
 */
function numberClamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

/**
 * Creates a new object by picking the specified keys from the input object.
 * @param obj The source object
 * @param keys The keys to pick
 * @returns A new object with only the picked keys
 */
function objectPick(obj, keys) {
    return keys.reduce((res, key) => {
        res[key] = obj[key];
        return res;
    }, {});
}
/**
 * Creates a new object by omitting the specified keys from the input object.
 * @param obj The source object
 * @param keys The keys to omit
 * @returns A new object without the omitted keys
 */
function objectOmit(obj, keys) {
    const result = { ...obj };
    keys.forEach((k) => delete result[k]);
    return result;
}

function generateNumberOTP(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}
function generateStringOTP(chars, length) {
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
function generateAlphanumericOTP(length) {
    return generateStringOTP('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', length);
}
function generateBase64OTP(length) {
    return generateStringOTP('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', length);
}
function generateLetterOtp(length) {
    return generateStringOTP('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', length);
}
/**
 * Generates a one-time password (OTP) of the specified type and length.
 * @param type The OTP generation type
 * @param length The length of the OTP
 * @returns The generated OTP string
 * @throws {Error} If the OTP type is invalid
 */
function generateOtp(type, length) {
    if (type === 'digits') {
        return generateNumberOTP(length);
    }
    else if (type === 'base64') {
        return generateBase64OTP(length);
    }
    else if (type.startsWith('letters')) {
        const otp = generateLetterOtp(length);
        if (type === 'letters-upper')
            return otp.toUpperCase();
        else if (type === 'letters-lower')
            return otp.toLowerCase();
        return otp;
    }
    else if (type.startsWith('alphanumeric')) {
        const otp = generateAlphanumericOTP(length);
        if (type === 'alphanumeric-upper')
            return otp.toUpperCase();
        else if (type === 'alphanumeric-lower')
            return otp.toLowerCase();
        return otp;
    }
    else {
        throw new Error('Invalid OTP type');
    }
}

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize
 * @returns The capitalized string
 */
function stringCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Converts a string to title case (first letter of each word capitalized).
 * @param str The string to convert
 * @returns The title-cased string
 */
function stringToTitleCase(str) {
    return str.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

/**
 * Returns a promise that resolves after a specified duration (in milliseconds).
 * @param duration Time to wait in milliseconds (default: 0)
 * @returns Promise that resolves after the duration
 * @example
 *   await wait(1000) // waits 1 second
 */
function wait(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

export { arrayChunk, arrayPartition, arrayShuffle, generateOtp, getSizeAsNumber, numberClamp, numberRange, objectOmit, objectPick, randomNumber, stringCapitalize, stringToTitleCase, wait };
