export type Scope = 'Machine' | 'User';
/**
 * Error thrown when environment variable operations fail.
 * @example
 *   throw new EnvError(1, 'Failed to set variable')
 */
export declare class EnvError extends Error {
    name: "EnvError";
    code: number;
    constructor(code: number, message: string);
}
/**
 * Executes a PowerShell command and returns its output as a string.
 * Throws EnvError if the command fails.
 * @param command PowerShell command to execute
 * @returns Output of the command
 * @example
 *   execPwshCommand('echo Hello') // 'Hello'
 */
export declare function execPwshCommand(command: string): string;
/**
 * Reads an environment variable from the specified scope.
 * @param name Name of the environment variable
 * @param scope Scope to read from ('Machine' or 'User')
 * @returns Value of the environment variable
 * @example
 *   readEnv('PATH', 'User')
 */
export declare function readEnv(name: string, scope: Scope): string;
/**
 * Writes an environment variable to the specified scope.
 * @param name Name of the environment variable
 * @param value Value to set
 * @param scope Scope to write to ('Machine' or 'User')
 * @returns Output of the set command
 * @example
 *   writeEnv('MY_VAR', '123', 'User')
 */
export declare function writeEnv(name: string, value: string, scope: Scope): string;
/**
 * Adds one or more paths to the PATH environment variable in the specified scope.
 * Ensures no duplicate paths are added.
 * @param scope Scope to update ('Machine' or 'User')
 * @param paths Paths to add
 * @returns Output of the set command
 * @example
 *   addToEnvPath('User', 'C:/My/Path')
 */
export declare function addToEnvPath(scope: Scope, ...paths: string[]): string;
