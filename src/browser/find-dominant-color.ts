const ENABLE_LOGGING = false
const DEFAULT_SAMPLE_COUNT = 20

/**
 * Finds the dominant color in an image.
 * @param src - The URL of the image to find the dominant color of.
 * @param sampleThreshold - The threshold for sampling the image.
 * @returns A promise that resolves to the dominant color.
 * @example
 * ```js
 * findDominantColor('https://example.com/image.png')
 * // #F29034
 * ```
 */
export function findDominantColor(
  src: string,
  sampleThreshold?: number
): Promise<string> {
  const imgEl = document.createElement('img')
  imgEl.src = src

  return new Promise((resolve, reject) => {
    imgEl.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        resolve(getDominantColor(canvas, imgEl, sampleThreshold))
      } catch (err) {
        if (err instanceof Error) {
          reject(err)
        } else {
          reject(new Error('Failed to get dominant color.'))
        }
      }
    }

    imgEl.onerror = () => {
      reject(
        new Error(
          'Failed to load image. Ensure the image URL allows cross-origin requests.'
        )
      )
    }
  })
}

function getDominantColor(
  canvas: HTMLCanvasElement,
  imgEl: HTMLImageElement,
  sampleThreshold?: number
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }

  const colorsMap = new Map<string, number>()

  canvas.width = imgEl.naturalWidth
  canvas.height = imgEl.naturalHeight

  ctx.drawImage(imgEl, 0, 0)
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

  const totalPixels = canvas.width * canvas.height
  const skipThreshold =
    4 *
    Math.max(
      1,
      Math.round(
        totalPixels /
          (sampleThreshold ? sampleThreshold ** 2 : DEFAULT_SAMPLE_COUNT)
      )
    )

  if (ENABLE_LOGGING) {
    console.log('Src:', imgEl.src)
    console.log('Canvas size:', canvas.width, canvas.height)
    console.log('Total pixels:', totalPixels)

    console.log('Data length:', data.length)
    console.log('Skip threshold:', skipThreshold)
    console.log('Sample count:', Math.floor(data.length / skipThreshold))

    console.log('\n')
  }

  for (let i = 0; i < data.length; i += skipThreshold) {
    const color = [data[i], data[i + 1], data[i + 2]].join(',')

    if (colorsMap.has(color)) {
      colorsMap.set(color, colorsMap.get(color)! + 1)
    } else {
      colorsMap.set(color, 1)
    }
  }

  const sortedColors = Array.from(colorsMap.entries()).sort(
    (a, b) => b[1] - a[1]
  )
  const rgbValue = sortedColors?.[0]?.[0]?.trim()

  if (!rgbValue) {
    throw new Error('No dominant color found.')
  }

  if (ENABLE_LOGGING) {
    console.log('Sorted colors:', sortedColors)
    console.log('Dominant color:', rgbValue)
  }

  return `rgb(${rgbValue})`
}
