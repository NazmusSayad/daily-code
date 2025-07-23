import { spawnSync } from 'child_process'

export type Scope = 'Machine' | 'User'

/**
 * Error thrown when environment variable operations fail.
 * @example
 *   throw new EnvError(1, 'Failed to set variable')
 */
export class EnvError extends Error {
  name = 'EnvError' as const
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.message = message
  }
}

/**
 * Executes a PowerShell command and returns its output as a string.
 * Throws EnvError if the command fails.
 * @param command PowerShell command to execute
 * @returns Output of the command
 * @example
 *   execPwshCommand('echo Hello') // 'Hello'
 */
export function execPwshCommand(command: string) {
  const result = spawnSync('powershell', ['-c', command])
  if (result.status !== 0) {
    throw new EnvError(result.status ?? 1, result.stderr.toString().trim())
  }

  return result.stdout.toString().trim()
}

/**
 * Reads an environment variable from the specified scope.
 * @param name Name of the environment variable
 * @param scope Scope to read from ('Machine' or 'User')
 * @returns Value of the environment variable
 * @example
 *   readEnv('PATH', 'User')
 */
export function readEnv(name: string, scope: Scope) {
  return execPwshCommand(
    `[System.Environment]::GetEnvironmentVariable("${name}", [System.EnvironmentVariableTarget]::${scope})`
  )
}

/**
 * Writes an environment variable to the specified scope.
 * @param name Name of the environment variable
 * @param value Value to set
 * @param scope Scope to write to ('Machine' or 'User')
 * @returns Output of the set command
 * @example
 *   writeEnv('MY_VAR', '123', 'User')
 */
export function writeEnv(name: string, value: string, scope: Scope) {
  return execPwshCommand(
    `[System.Environment]::SetEnvironmentVariable("${name}", "${value}", [System.EnvironmentVariableTarget]::${scope})`
  )
}

/**
 * Adds one or more paths to the PATH environment variable in the specified scope.
 * Ensures no duplicate paths are added.
 * @param scope Scope to update ('Machine' or 'User')
 * @param paths Paths to add
 * @returns Output of the set command
 * @example
 *   addToEnvPath('User', 'C:/My/Path')
 */
export function addToEnvPath(scope: Scope, ...paths: string[]) {
  const existingPath = readEnv('PATH', scope)
  const existingPathArray = existingPath.split(';').filter((p) => p)
  const newPath = [...new Set([...existingPathArray, ...paths])].join(';')
  return writeEnv('PATH', newPath, scope)
}
