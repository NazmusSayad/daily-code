/**
 * Creates a new object by picking the specified keys from the input object.
 * @param obj The source object
 * @param keys The keys to pick
 * @returns A new object with only the picked keys
 */
export declare function objectPick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
/**
 * Creates a new object by omitting the specified keys from the input object.
 * @param obj The source object
 * @param keys The keys to omit
 * @returns A new object without the omitted keys
 */
export declare function objectOmit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
