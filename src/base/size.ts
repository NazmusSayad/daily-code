export function formatBytesToHumanReadable(bytes: number): {
  value: number
  unit: string
  text: string
} {
  if (bytes <= 0) {
    throw new Error('Bytes must be greater than 0')
  }

  if (isNaN(bytes)) {
    throw new Error('Bytes must be a number')
  }

  if (!Number.isInteger(bytes)) {
    throw new Error('Bytes must be an integer')
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = Math.floor(Math.log(bytes) / Math.log(1024))

  if (index >= units.length) {
    index = units.length - 1
  }

  const value = bytes / Math.pow(1024, index)
  const unit = units[index]

  return { value, unit, text: `${value.toFixed(2)} ${unit}` }
}
