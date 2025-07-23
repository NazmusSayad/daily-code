export function createElementFromString(input: string): HTMLElement {
  return new DOMParser().parseFromString(input, 'text/html').body
    .firstElementChild as HTMLElement
}
