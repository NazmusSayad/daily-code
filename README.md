# daily-code

A collection of robust, type-safe utilities and helpers for Node.js, browser, and server environments. Includes utilities for color conversion, random numbers, async waits, DOM manipulation, environment variables, and more.

## Features

- Type-safe utilities for Node.js, browser, and server
- Color conversion and image helpers
- Async and random utilities
- Environment variable management for Windows
- Route wrapper for server logic
- Written in modern TypeScript with strict type safety
- Minimal bundle size
- Zero dependencies
- Comprehensive test coverage

## Why Minimal & Dependency-Free?

- **Minimal bundle size:** Designed to keep your applications fast and lightweight, especially important for browser and serverless environments.
- **Zero dependencies:** No third-party runtime dependencies, reducing security risks, install times, and version conflicts. All utilities are implemented from scratch using modern TypeScript/JavaScript.

## Overview of Available Functions

### Base Utilities
- `wait(ms)`: Delays execution for a specified number of milliseconds (Promise-based).
- `randomNumber(max, min?)`: Generates a random integer between min and max.
- `hexToRGB(hex)`: Converts a hex color string to an RGB object.

### Type Utilities
- `Prettify<T>`: Flattens and prettifies complex TypeScript types for better readability.

### Browser Utilities
- `createElementFromString(html)`: Creates an HTMLElement from an HTML string.
- `findDominantColor(src, sampleThreshold?)`: Finds the dominant color in an image (returns a Promise).
- `monoColorImage(color)`: Generates a data URL for a 1x1 image of a single color.

### Node Utilities
- `execPwshCommand(command)`: Executes a PowerShell command and returns its output as a string.
- `readEnv(name, scope)`: Reads a Windows environment variable from the specified scope.
- `writeEnv(name, value, scope)`: Writes a Windows environment variable to the specified scope.
- `addToEnvPath(scope, ...paths)`: Adds one or more paths to the PATH environment variable in the specified scope.
- `applyNodeMD4Issue()`: Applies a workaround for Node.js MD4 crypto support.
- `EnvError`: Error class for environment variable operations.

### Server Utilities
- `routeWrapper(catcher?, finisher?)`: Wraps server route logic for error and response handling.
- `SocketIoRouter`: Class for creating Socket.IO routers.
- `createSocketIoRouter()`: Factory function to create a new Socket.IO router instance.
- Types for advanced server route typing (see `server/route-wrapper/types.type.ts`).

## Installation

```
npm install daily-code
```