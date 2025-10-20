export type DownloadFileUrlOptions = {
  filename?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: 'noopener' | 'noreferrer'
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
}

/**
 * Downloads a file from a URL.
 * @param url - The URL of the file to download.
 * @param options - Options for the download.
 * @example
 * ```js
 * downloadFileUrl('https://example.com/file.pdf', {
 *   filename: 'file.pdf'
 * })
 * ```
 */
export function downloadFileUrl(url: string, options?: DownloadFileUrlOptions) {
  const a = document.createElement('a')

  a.href = url
  a.target = options?.target ?? '_blank'
  a.download = options?.filename ?? url.split('/').pop() ?? 'download'

  if (options?.rel) a.rel = options.rel
  if (options?.referrerPolicy) a.referrerPolicy = options.referrerPolicy

  a.click()

  try {
    a.remove()
  } catch {}
}
