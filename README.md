# daily-code

A collection of robust, type-safe utilities and helpers for Node.js, browser, React, and server environments. Includes utilities for color conversion, image generation, cookie management, array manipulation, string processing, environment variables, React hooks, Socket.IO routing, and more.

## Features

- **Type-safe utilities** for Node.js, browser, React, and server environments
- **Array manipulation** (shuffle, chunk, partition, sort by frequency, remove nullish values)
- **String processing** (capitalize, title case, truncate, UUID generation)
- **Object utilities** (pick, omit, conditional undefined)
- **Color conversion and image generation** (hex to RGB, canvas images, avatars, gradients)
- **DOM manipulation** (element creation, file downloads, cookie management)
- **Async utilities** (wait, suspense handlers)
- **Environment variable management** for Windows (PowerShell integration)
- **Route and socket wrappers** for server logic (Express, Socket.IO)
- **React hooks and components** (context, effects, error boundaries)
- **TypeScript utilities** (Prettify, OmitPartials, PrettifyRecord, PrettifyArray, Nullify, NullifyPartial)
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
import type { Prettify, OmitPartials } from 'daily-code'

// Granular imports for smaller bundles
import { arrayShuffle } from 'daily-code/base/array'
import { objectPick } from 'daily-code/base/object'
import { stringCapitalize } from 'daily-code/base/string'
import { generateOtp } from 'daily-code/base/otp'
import { formatBytesToHumanReadable } from 'daily-code/base/size'
import { randomNumber } from 'daily-code/base/number'
import { applyNodeMD4Issue } from 'daily-code/node/md4'
import { readEnv, writeEnv } from 'daily-code/node/windows-env'
import { routeWrapper } from 'daily-code/server/route'
import { SocketIoRouter } from 'daily-code/server/socket-io'
```

## Utilities Overview

### Base Utilities (`daily-code`)

#### Array Utilities

- `numberRange(start, end)`: Create a range of numbers from start (inclusive) to end (exclusive)
- `arrayShuffle(arr)`: Returns a new array with elements shuffled randomly
- `arrayChunk(arr, size)`: Split an array into chunks of specified size
- `arrayPartition(arr, predicate)`: Partition an array into two arrays based on a predicate function
- `sortByFrequency(arr)`: Sorts an array by frequency of elements (most frequent first)
- `nonNullifyArray(arr)`: Returns a new array with all nullish values removed

#### Number Utilities

- `randomNumber(max, min?)`: Generate a random integer between min and max (inclusive)
- `getSizeAsNumber(value)`: Parse a string/number to a number (supports 'px' units)
- `numberClamp(num, min, max)`: Clamp a number between minimum and maximum values

#### Size Utilities

- `formatBytesToHumanReadable(bytes)`: Format bytes into human readable format (B, KB, MB, GB, etc.)

#### Object Utilities

- `objectPick(obj, keys)`: Create a new object by picking specified keys
- `objectOmit(obj, keys)`: Create a new object by omitting specified keys
- `undefinedIfHasNoKeys(obj)`: Returns undefined if the object has no keys, otherwise returns the object

#### String Utilities

- `stringCapitalize(str)`: Capitalize the first letter of a string
- `stringToTitleCase(str)`: Convert a string to title case (first letter of each word capitalized)
- `stringTruncate(str, length)`: Truncate a string to a specified length with ellipsis
- `generateUUID()`: Generate a UUID (v4)

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

#### DOM & Element Utilities

- `createElementFromString(html)`: Create an HTMLElement from an HTML string
- `openFileExplorer(options?)`: Open a file picker dialog with options:
  - `accept`: File type filter (default: 'image/\*')
  - `multiple`: Allow multiple file selection (default: false)

#### File Download Utilities

- `downloadFileUrl(url, options?)`: Download a file from a URL with options:
  - `filename`: Custom filename for download
  - `target`: Link target (\_blank, \_self, etc.)
  - `rel`: Link relation (noopener, noreferrer)
  - `referrerPolicy`: Referrer policy for the link

#### Image & Canvas Utilities

- `findDominantColor(src, sampleThreshold?)`: Find the dominant color in an image (returns Promise of RGB string)
- `monoColorImage(color)`: Generate a base64 PNG data URL for a 1x1 image of a given color
- `generateDemoImage(options?)`: Generate a demo image with text overlay
- `generateAvatar(options?)`: Generate an avatar image with initials
- `generateRandomGradient(options?)`: Generate a random gradient image
- `generateNoiseImage(options?)`: Generate a noise texture image

#### Cookie Utilities

- `setCookie(name, value, options?)`: Set a cookie with advanced options (expires, maxAge, path, domain, secure, sameSite)
- `getCookie(name)`: Get a cookie value by name
- `deleteCookie(name, options?)`: Delete a cookie
- `hasCookie(name)`: Check if a cookie exists
- `getAllCookies()`: Get all cookies as a key-value object

### Node Utilities (`daily-code/node`)

#### Crypto Utilities

- `applyNodeMD4Issue()`: Patch Node.js crypto to support MD4 (fallback to MD5 if not supported)

#### Windows Environment Variables (PowerShell)

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

#### Context & State Management

- `createContext(useValue, options?)`: Create a React context with easy-to-use hook
- `useEffectState(initialValue, deps)`: Hook that combines useState and useEffect for reactive state
- `useEffectExceptOnMount(effect, dependencies)`: Like useEffect but skips running on initial mount

#### Suspense & Async

- `createReactSuspense(promise?)`: Create a React Suspense handler for promises
- `useSuspense(suspended)`: React Suspense utility hook that throws a promise when suspended

#### Error Handling

- `ErrorBoundary`: React error boundary component for catching and displaying errors

### Type Utilities (`daily-code/types`)

- `Prettify<T>`: Flatten and prettify complex TypeScript types for better readability
- `OmitPartials<T>`: Omit partial (nullable) properties from an object type
- `PrettifyRecord<T>`: Simplify and flatten record types for better readability in type hints
- `PrettifyArray<T>`: Simplify and flatten array types for better readability in type hints
- `Nullify<T>`: Make all properties of an object type nullable
- `NullifyPartial<T>`: Make all properties of an object type optional and nullable
