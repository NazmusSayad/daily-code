export type DemoImageOptions = {
  width?: number
  height?: number
  bg?: string
  text?: string
}

export type AvatarOptions = {
  size?: number
  seed?: number
  initials?: string
}

export type GradientOptions = {
  width?: number
  height?: number
}

export type NoiseOptions = {
  width?: number
  height?: number
}

export function generateDemoImage({
  width = 200,
  height = 100,
  bg = '#ccc',
  text = 'Demo',
}: DemoImageOptions = {}): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#000'
  ctx.font = `${Math.floor(height / 3)}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, width / 2, height / 2)

  return canvas.toDataURL()
}

export function generateAvatar({
  size = 100,
  seed = Math.random(),
  initials = 'A',
}: AvatarOptions = {}): string {
  const hue = Math.floor(seed * 360)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = `hsl(${hue}, 70%, 50%)`
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
  ctx.fill()

  ctx.fillStyle = '#fff'
  ctx.font = `${size / 2}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(initials.charAt(0).toUpperCase(), size / 2, size / 2)

  return canvas.toDataURL()
}

export function generateRandomGradient({
  width = 300,
  height = 150,
}: GradientOptions = {}): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  const color1 = `hsl(${Math.random() * 360}, 70%, 60%)`
  const color2 = `hsl(${Math.random() * 360}, 70%, 60%)`

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL()
}

export function generateNoiseImage({
  width = 200,
  height = 100,
}: NoiseOptions = {}): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const imageData = ctx.createImageData(width, height)

  for (let i = 0; i < imageData.data.length; i += 4) {
    const val = Math.floor(Math.random() * 256)
    imageData.data[i] = val
    imageData.data[i + 1] = val
    imageData.data[i + 2] = val
    imageData.data[i + 3] = 255
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL()
}
