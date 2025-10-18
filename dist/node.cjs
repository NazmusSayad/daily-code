'use strict';

var crypto = require('crypto');
var child_process = require('child_process');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var crypto__namespace = /*#__PURE__*/_interopNamespaceDefault(crypto);

/**
 * Applies a workaround to the Node.js crypto module to support MD4 hashing.
 * This is necessary because MD4 is no longer supported in Node.js 20 and later.
 * @example
 * ```js
 * applyNodeMD4Issue()
 * ```
 */
function applyNodeMD4Issue() {
    try {
        crypto__namespace.createHash('md4');
    }
    catch {
        console.warn('Crypto "md4" is not supported anymore by this Node version', '\n', 'Replacing "md4" with "md5"');
        const origCreateHash = crypto__namespace.createHash;
        function fakeCreateHash(alg, opts) {
            return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
        }
        // @ts-expect-error - This is a workaround to support MD4 hashing
        crypto__namespace.createHash = fakeCreateHash;
    }
}

/**
 * Error thrown when environment variable operations fail.
 * @example
 *   throw new EnvError(1, 'Failed to set variable')
 */
class EnvError extends Error {
    name = 'EnvError';
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
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
function execPwshCommand(command) {
    const result = child_process.spawnSync('powershell', ['-c', command]);
    if (result.status !== 0) {
        throw new EnvError(result.status ?? 1, result.stderr.toString().trim());
    }
    return result.stdout.toString().trim();
}
/**
 * Reads an environment variable from the specified scope.
 * @param name Name of the environment variable
 * @param scope Scope to read from ('Machine' or 'User')
 * @returns Value of the environment variable
 * @example
 *   readEnv('PATH', 'User')
 */
function readEnv(name, scope) {
    return execPwshCommand(`[System.Environment]::GetEnvironmentVariable("${name}", [System.EnvironmentVariableTarget]::${scope})`);
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
function writeEnv(name, value, scope) {
    return execPwshCommand(`[System.Environment]::SetEnvironmentVariable("${name}", "${value}", [System.EnvironmentVariableTarget]::${scope})`);
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
function addToEnvPath(scope, ...paths) {
    const existingPath = readEnv('PATH', scope);
    const existingPathArray = existingPath.split(';').filter((p) => p);
    const newPath = [...new Set([...existingPathArray, ...paths])].join(';');
    return writeEnv('PATH', newPath, scope);
}

exports.EnvError = EnvError;
exports.addToEnvPath = addToEnvPath;
exports.applyNodeMD4Issue = applyNodeMD4Issue;
exports.execPwshCommand = execPwshCommand;
exports.readEnv = readEnv;
exports.writeEnv = writeEnv;
