/**
 * Downloads a file from a URL.
 * @param url - The URL of the file to download.
 * @param filename - The name of the file to download.
 * @example
 * ```js
 * downloadFileUrl('https://example.com/file.pdf', 'file.pdf')
 * ```
 */
export function downloadFileUrl(url: string, filename?: string) {
  const a = document.createElement('a')

  a.href = url
  a.download = filename ?? url.split('/').pop() ?? 'download'

  a.click()

  try {
    a.remove()
  } catch {}
}
