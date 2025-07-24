# daily-code

A collection of robust, type-safe utilities and helpers for Node.js, browser, and server environments. Includes utilities for color conversion, random numbers, async waits, DOM manipulation, environment variables, and more.

## Features

- Type-safe utilities for Node.js, browser, and server
- Color conversion and image helpers
- Async and random utilities
- Environment variable management for Windows
- Route and socket wrappers for server logic
- Written in modern TypeScript with strict type safety
- Minimal bundle size
- Zero dependencies
- Comprehensive test coverage

## Why Minimal & Dependency-Free?

- **Minimal bundle size:** Designed to keep your applications fast and lightweight, especially important for browser and serverless environments.
- **Zero dependencies:** No third-party runtime dependencies, reducing security risks, install times, and version conflicts. All utilities are implemented from scratch using modern TypeScript/JavaScript.

## Utilities Overview

### Base Utilities (`src/base`)

- `numberRange(start, end)`: Create a range of numbers.
- `arrayShuffle(arr)`: Shuffle an array randomly.
- `arrayChunk(arr, size)`: Split an array into chunks.
- `arrayPartition(arr, predicate)`: Partition an array by a predicate.
- `hexToRGB(hex)`: Convert a hex color string to an RGB object.
- `randomNumber(max, min?)`: Generate a random integer between min and max.
- `getSizeAsNumber(value)`: Parse a string/number to a number (supports px).
- `numberClamp(num, min, max)`: Clamp a number between min and max.
- `objectPick(obj, keys)`: Pick specific keys from an object.
- `objectOmit(obj, keys)`: Omit specific keys from an object.
- `generateOtp(type, length)`: Generate OTPs (digits, base64, letters, alphanumeric, upper/lower).
- `stringCapitalize(str)`: Capitalize the first letter of a string.
- `stringToTitleCase(str)`: Convert a string to title case.
- `wait(duration?)`: Promise that resolves after a delay.

### Browser Utilities (`src/browser`)

- `createElementFromString(html)`: Create an HTMLElement from an HTML string.
- `openFileExplorer(options?)`: Open a file picker dialog (with accept/multiple options).
- `findDominantColor(src, sampleThreshold?)`: Find the dominant color in an image (returns a Promise of rgb string).
- `monoColorImage(color)`: Generate a base64 PNG data URL for a 1x1 image of a given color.

#### Mono Color Image Internals

- PNG/adler32/crc32/chunk helpers (see `src/browser/mono-color-image/lib.ts`).

### Node Utilities (`src/node`)

- `applyNodeMD4Issue()`: Patch Node.js crypto to support MD4 (fallback to MD5 if not supported).
- `execPwshCommand(command)`: Execute a PowerShell command and return output.
- `readEnv(name, scope)`: Read a Windows environment variable from a given scope.
- `writeEnv(name, value, scope)`: Write a Windows environment variable to a given scope.
- `addToEnvPath(scope, ...paths)`: Add paths to the PATH environment variable in a given scope.
- `EnvError`: Error class for environment variable operations.

### Server Utilities (`src/server`)

- `routeWrapper(catcher?, finisher?)`: Create a route wrapper for error/response handling.
- `SocketIoRouter`: Class for creating Socket.IO routers.
- `createSocketIoRouter()`: Factory for a new Socket.IO router instance.
- Types for advanced server route typing (see `src/server/route-wrapper/types.type.ts`).

### Type Utilities (`src/types`)

- `Prettify<T>`: Flatten and prettify complex TypeScript types.
- `OmitPartials<T>`: Omit partial (nullable) properties from a type.

## Installation

```
npm install daily-code
```
