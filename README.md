# daily-code

A collection of robust, type-safe utilities and helpers for Node.js, browser, React, and server environments. Includes utilities for color conversion, random numbers, async waits, DOM manipulation, environment variables, React hooks, and more.

## Features

- Type-safe utilities for Node.js, browser, React, and server
- Color conversion and image helpers
- Async and random utilities
- Environment variable management for Windows
- Route and socket wrappers for server logic
- React hooks and components
- Written in modern TypeScript with strict type safety
- Minimal bundle size
- Zero dependencies
- Comprehensive test coverage

## Why Minimal & Dependency-Free?

- **Minimal bundle size:** Designed to keep your applications fast and lightweight, especially important for browser and serverless environments.
- **Zero dependencies:** No third-party runtime dependencies, reducing security risks, install times, and version conflicts. All utilities are implemented from scratch using modern TypeScript/JavaScript.

## Installation

```bash
npm install daily-code
```

## Usage

The package provides multiple entry points for different environments:

```javascript
// Base utilities (always available)
import { randomNumber, wait, hexToRGB } from 'daily-code'

// Browser-specific utilities
import { createElementFromString, findDominantColor } from 'daily-code/browser'

// Node.js utilities
import { readEnv, writeEnv } from 'daily-code/node'

// Server utilities
import { routeWrapper, createSocketIoRouter } from 'daily-code/server'

// React utilities
import { createContext, ErrorBoundary } from 'daily-code/react'

// Type utilities
import type { Prettify, OmitPartials } from 'daily-code/ts'

// React utilities
import { useEffectState } from 'daily-code/react'
```

## Utilities Overview

### Base Utilities (`daily-code`)

#### Array Utilities

- `numberRange(start, end)`: Create a range of numbers from start (inclusive) to end (exclusive)
- `arrayShuffle(arr)`: Returns a new array with elements shuffled randomly
- `arrayChunk(arr, size)`: Split an array into chunks of specified size
- `arrayPartition(arr, predicate)`: Partition an array into two arrays based on a predicate function

#### Number Utilities

- `randomNumber(max, min?)`: Generate a random integer between min and max (inclusive)
- `getSizeAsNumber(value)`: Parse a string/number to a number (supports 'px' units)
- `numberClamp(num, min, max)`: Clamp a number between minimum and maximum values

#### Object Utilities

- `objectPick(obj, keys)`: Create a new object by picking specified keys
- `objectOmit(obj, keys)`: Create a new object by omitting specified keys

#### String Utilities

- `stringCapitalize(str)`: Capitalize the first letter of a string
- `stringToTitleCase(str)`: Convert a string to title case (first letter of each word capitalized)

#### Color Utilities

- `hexToRGB(hex)`: Convert a hex color string to an RGB object with r, g, b properties

#### OTP Generation

- `generateOtp(type, length)`: Generate one-time passwords with various types:
  - `'digits'`: Numeric OTP (0-9)
  - `'base64'`: Base64 characters (A-Z, a-z, 0-9, +, /)
  - `'letters'`: Mixed case letters (A-Z, a-z)
  - `'letters-upper'`: Uppercase letters only
  - `'letters-lower'`: Lowercase letters only
  - `'alphanumeric'`: Mixed case alphanumeric
  - `'alphanumeric-upper'`: Uppercase alphanumeric
  - `'alphanumeric-lower'`: Lowercase alphanumeric

#### Async Utilities

- `wait(duration?)`: Promise that resolves after a specified delay (default: 0ms)

### Browser Utilities (`daily-code/browser`)

- `createElementFromString(html)`: Create an HTMLElement from an HTML string
- `openFileExplorer(options?)`: Open a file picker dialog with options:
  - `accept`: File type filter (default: 'image/\*')
  - `multiple`: Allow multiple file selection (default: false)
- `findDominantColor(src, sampleThreshold?)`: Find the dominant color in an image (returns Promise of RGB string)
- `monoColorImage(color)`: Generate a base64 PNG data URL for a 1x1 image of a given color

### Node Utilities (`daily-code/node`)

- `applyNodeMD4Issue()`: Patch Node.js crypto to support MD4 (fallback to MD5 if not supported)
- `execPwshCommand(command)`: Execute a PowerShell command and return output
- `readEnv(name, scope)`: Read a Windows environment variable from specified scope ('Machine' or 'User')
- `writeEnv(name, value, scope)`: Write a Windows environment variable to specified scope
- `addToEnvPath(scope, ...paths)`: Add paths to the PATH environment variable (ensures no duplicates)
- `EnvError`: Error class for environment variable operations

### Server Utilities (`daily-code/server`)

- `routeWrapper(catcher?, finisher?)`: Create a route wrapper for error/response handling
- `SocketIoRouter`: Class for creating Socket.IO routers
- `createSocketIoRouter()`: Factory function for creating new Socket.IO router instances

### React Utilities (`daily-code/react`)

- `createContext(useValue, options?)`: Create a React context with easy-to-use hook
- `createReactSuspense(promise?)`: Create a React Suspense handler for promises
- `ErrorBoundary`: React error boundary component for catching and displaying errors
- `useEffectExceptOnMount(effect, dependencies)`: Like useEffect but skips running on initial mount
- `useSuspense(suspended)`: React Suspense utility hook that throws a promise when suspended

### Type Utilities (`daily-code/ts`)

- `Prettify<T>`: Flatten and prettify complex TypeScript types for better readability
- `OmitPartials<T>`: Omit partial (nullable) properties from an object type
