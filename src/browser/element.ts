/**
 * Creates an HTMLElement from an HTML string.
 * @param input HTML string to convert
 * @returns The first HTMLElement parsed from the string
 * @example
 *   createElementFromString('<div>Hello</div>') // <div>Hello</div>
 */
export function createElementFromString(input: string): HTMLElement {
  return new DOMParser().parseFromString(input, 'text/html').body
    .firstElementChild as HTMLElement
}
