import { describe, expect, it } from 'vitest'
import { hexToRGB } from './hex-to-rgb'

describe('hexToRGB', () => {
  it('should convert black hex to RGB', () => {
    expect(hexToRGB('#000000')).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('should convert white hex to RGB', () => {
    expect(hexToRGB('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('should convert red hex to RGB', () => {
    expect(hexToRGB('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('should convert green hex to RGB', () => {
    expect(hexToRGB('#00ff00')).toEqual({ r: 0, g: 255, b: 0 })
  })

  it('should convert blue hex to RGB', () => {
    expect(hexToRGB('#0000ff')).toEqual({ r: 0, g: 0, b: 255 })
  })

  it('should convert a mixed color hex to RGB', () => {
    expect(hexToRGB('#fa8072')).toEqual({ r: 250, g: 128, b: 114 })
  })

  it('should handle short hex codes (e.g., #03F)', () => {
    expect(hexToRGB('#03F')).toEqual({ r: 0, g: 51, b: 255 })
  })

  it('should handle uppercase hex codes', () => {
    expect(hexToRGB('#FF0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('should handle mixed-case hex codes', () => {
    expect(hexToRGB('#fA8072')).toEqual({ r: 250, g: 128, b: 114 })
  })

  it('should throw an error for invalid hex code length', () => {
    expect(() => hexToRGB('#12345')).toThrow()
    expect(() => hexToRGB('#1234567')).toThrow()
    expect(() => hexToRGB('#12')).toThrow()
  })

  it('should throw an error for hex codes with invalid characters', () => {
    expect(() => hexToRGB('#GGGGGG')).toThrow()
    expect(() => hexToRGB('#FF00G0')).toThrow()
    expect(() => hexToRGB('#F0G')).toThrow()
  })

  it('should throw an error for hex codes without # prefix', () => {
    expect(() => hexToRGB('FFFFFF')).toThrow()
    expect(() => hexToRGB('FFF')).toThrow()
  })

  it.each([
    { hex: '#000000', expected: { r: 0, g: 0, b: 0 } },
    { hex: '#FFFFFF', expected: { r: 255, g: 255, b: 255 } },
    { hex: '#FF0000', expected: { r: 255, g: 0, b: 0 } },
    { hex: '#00FF00', expected: { r: 0, g: 255, b: 0 } },
    { hex: '#0000FF', expected: { r: 0, g: 0, b: 255 } },
    { hex: '#FA8072', expected: { r: 250, g: 128, b: 114 } },
    { hex: '#F0F', expected: { r: 255, g: 0, b: 255 } },
    { hex: '#0F0', expected: { r: 0, g: 255, b: 0 } },
    { hex: '#FFD700', expected: { r: 255, g: 215, b: 0 } },
    { hex: '#ADFF2F', expected: { r: 173, g: 255, b: 47 } },
    { hex: '#4682B4', expected: { r: 70, g: 130, b: 180 } },
    { hex: '#8A2BE2', expected: { r: 138, g: 43, b: 226 } },
    { hex: '#DC143C', expected: { r: 220, g: 20, b: 60 } },
    { hex: '#00FFFF', expected: { r: 0, g: 255, b: 255 } },
    { hex: '#FFEBCD', expected: { r: 255, g: 235, b: 205 } },
    { hex: '#DEB887', expected: { r: 222, g: 184, b: 135 } },
    { hex: '#5F9EA0', expected: { r: 95, g: 158, b: 160 } },
    { hex: '#7FFF00', expected: { r: 127, g: 255, b: 0 } },
    { hex: '#D2691E', expected: { r: 210, g: 105, b: 30 } },
    { hex: '#6495ED', expected: { r: 100, g: 149, b: 237 } },
    { hex: '#FFF8DC', expected: { r: 255, g: 248, b: 220 } },
    { hex: '#00CED1', expected: { r: 0, g: 206, b: 209 } },
    { hex: '#9400D3', expected: { r: 148, g: 0, b: 211 } },
    { hex: '#FF1493', expected: { r: 255, g: 20, b: 147 } },
    { hex: '#00BFFF', expected: { r: 0, g: 191, b: 255 } },
    { hex: '#696969', expected: { r: 105, g: 105, b: 105 } },
    { hex: '#1E90FF', expected: { r: 30, g: 144, b: 255 } },
    { hex: '#B22222', expected: { r: 178, g: 34, b: 34 } },
    { hex: '#FFFAF0', expected: { r: 255, g: 250, b: 240 } },
    { hex: '#228B22', expected: { r: 34, g: 139, b: 34 } },
    { hex: '#DCDCDC', expected: { r: 220, g: 220, b: 220 } },
    { hex: '#F8F8FF', expected: { r: 248, g: 248, b: 255 } },
    { hex: '#DAA520', expected: { r: 218, g: 165, b: 32 } },
    { hex: '#808080', expected: { r: 128, g: 128, b: 128 } },
    { hex: '#008000', expected: { r: 0, g: 128, b: 0 } },
    { hex: '#F0FFF0', expected: { r: 240, g: 255, b: 240 } },
    { hex: '#FF69B4', expected: { r: 255, g: 105, b: 180 } },
    { hex: '#CD5C5C', expected: { r: 205, g: 92, b: 92 } },
    { hex: '#4B0082', expected: { r: 75, g: 0, b: 130 } },
    { hex: '#FFFFF0', expected: { r: 255, g: 255, b: 240 } },
    { hex: '#F0E68C', expected: { r: 240, g: 230, b: 140 } },
    { hex: '#E6E6FA', expected: { r: 230, g: 230, b: 250 } },
    { hex: '#FFF0F5', expected: { r: 255, g: 240, b: 245 } },
    { hex: '#7CFC00', expected: { r: 124, g: 252, b: 0 } },
    { hex: '#FFFACD', expected: { r: 255, g: 250, b: 205 } },
    { hex: '#ADD8E6', expected: { r: 173, g: 216, b: 230 } },
    { hex: '#F08080', expected: { r: 240, g: 128, b: 128 } },
    { hex: '#E0FFFF', expected: { r: 224, g: 255, b: 255 } },
    { hex: '#FAFAD2', expected: { r: 250, g: 250, b: 210 } },
    { hex: '#D3D3D3', expected: { r: 211, g: 211, b: 211 } },
    { hex: '#90EE90', expected: { r: 144, g: 238, b: 144 } },
    { hex: '#FFB6C1', expected: { r: 255, g: 182, b: 193 } },
    { hex: '#FFA07A', expected: { r: 255, g: 160, b: 122 } },
    { hex: '#20B2AA', expected: { r: 32, g: 178, b: 170 } },
    { hex: '#87CEFA', expected: { r: 135, g: 206, b: 250 } },
    { hex: '#778899', expected: { r: 119, g: 136, b: 153 } },
    { hex: '#B0C4DE', expected: { r: 176, g: 196, b: 222 } },
    { hex: '#FFFFE0', expected: { r: 255, g: 255, b: 224 } },
    { hex: '#32CD32', expected: { r: 50, g: 205, b: 50 } },
    { hex: '#FAF0E6', expected: { r: 250, g: 240, b: 230 } },
    { hex: '#800000', expected: { r: 128, g: 0, b: 0 } },
    { hex: '#66CDAA', expected: { r: 102, g: 205, b: 170 } },
    { hex: '#0000CD', expected: { r: 0, g: 0, b: 205 } },
    { hex: '#BA55D3', expected: { r: 186, g: 85, b: 211 } },
    { hex: '#9370DB', expected: { r: 147, g: 112, b: 219 } },
    { hex: '#3CB371', expected: { r: 60, g: 179, b: 113 } },
    { hex: '#7B68EE', expected: { r: 123, g: 104, b: 238 } },
    { hex: '#00FA9A', expected: { r: 0, g: 250, b: 154 } },
    { hex: '#48D1CC', expected: { r: 72, g: 209, b: 204 } },
    { hex: '#C71585', expected: { r: 199, g: 21, b: 133 } },
    { hex: '#191970', expected: { r: 25, g: 25, b: 112 } },
    { hex: '#F5FFFA', expected: { r: 245, g: 255, b: 250 } },
    { hex: '#FFE4E1', expected: { r: 255, g: 228, b: 225 } },
    { hex: '#FFE4B5', expected: { r: 255, g: 228, b: 181 } },
    { hex: '#FFDEAD', expected: { r: 255, g: 222, b: 173 } },
    { hex: '#000080', expected: { r: 0, g: 0, b: 128 } },
    { hex: '#FDF5E6', expected: { r: 253, g: 245, b: 230 } },
    { hex: '#808000', expected: { r: 128, g: 128, b: 0 } },
    { hex: '#6B8E23', expected: { r: 107, g: 142, b: 35 } },
    { hex: '#FFA500', expected: { r: 255, g: 165, b: 0 } },
    { hex: '#FF4500', expected: { r: 255, g: 69, b: 0 } },
    { hex: '#DA70D6', expected: { r: 218, g: 112, b: 214 } },
    { hex: '#EEE8AA', expected: { r: 238, g: 232, b: 170 } },
    { hex: '#98FB98', expected: { r: 152, g: 251, b: 152 } },
    { hex: '#AFEEEE', expected: { r: 175, g: 238, b: 238 } },
    { hex: '#DB7093', expected: { r: 219, g: 112, b: 147 } },
    { hex: '#FFEFD5', expected: { r: 255, g: 239, b: 213 } },
    { hex: '#FFDAB9', expected: { r: 255, g: 218, b: 185 } },
    { hex: '#CD853F', expected: { r: 205, g: 133, b: 63 } },
    { hex: '#FFC0CB', expected: { r: 255, g: 192, b: 203 } },
    { hex: '#DDA0DD', expected: { r: 221, g: 160, b: 221 } },
    { hex: '#B0E0E6', expected: { r: 176, g: 224, b: 230 } },
    { hex: '#800080', expected: { r: 128, g: 0, b: 128 } },
    { hex: '#BC8F8F', expected: { r: 188, g: 143, b: 143 } },
    { hex: '#4169E1', expected: { r: 65, g: 105, b: 225 } },
    { hex: '#8B4513', expected: { r: 139, g: 69, b: 19 } },
    { hex: '#2E8B57', expected: { r: 46, g: 139, b: 87 } },
    { hex: '#FFF5EE', expected: { r: 255, g: 245, b: 238 } },
    { hex: '#A0522D', expected: { r: 160, g: 82, b: 45 } },
    { hex: '#C0C0C0', expected: { r: 192, g: 192, b: 192 } },
    { hex: '#87CEEB', expected: { r: 135, g: 206, b: 235 } },
    { hex: '#6A5ACD', expected: { r: 106, g: 90, b: 205 } },
    { hex: '#708090', expected: { r: 112, g: 128, b: 144 } },
    { hex: '#FFFAFA', expected: { r: 255, g: 250, b: 250 } },
    { hex: '#00FF7F', expected: { r: 0, g: 255, b: 127 } },
    { hex: '#D2B48C', expected: { r: 210, g: 180, b: 140 } },
    { hex: '#008080', expected: { r: 0, g: 128, b: 128 } },
    { hex: '#D8BFD8', expected: { r: 216, g: 191, b: 216 } },
    { hex: '#FF6347', expected: { r: 255, g: 99, b: 71 } },
    { hex: '#40E0D0', expected: { r: 64, g: 224, b: 208 } },
    { hex: '#EE82EE', expected: { r: 238, g: 130, b: 238 } },
    { hex: '#F5DEB3', expected: { r: 245, g: 222, b: 179 } },
    { hex: '#F5F5F5', expected: { r: 245, g: 245, b: 245 } },
    { hex: '#FFFF00', expected: { r: 255, g: 255, b: 0 } },
    { hex: '#9ACD32', expected: { r: 154, g: 205, b: 50 } },
    { hex: '#F00', expected: { r: 255, g: 0, b: 0 } },
    { hex: '#0F0', expected: { r: 0, g: 255, b: 0 } },
    { hex: '#00F', expected: { r: 0, g: 0, b: 255 } },
    { hex: '#FF0', expected: { r: 255, g: 255, b: 0 } },
    { hex: '#0FF', expected: { r: 0, g: 255, b: 255 } },
    { hex: '#F0F', expected: { r: 255, g: 0, b: 255 } },
    { hex: '#C0C', expected: { r: 204, g: 0, b: 204 } },
    { hex: '#888', expected: { r: 136, g: 136, b: 136 } },
    { hex: '#369', expected: { r: 51, g: 102, b: 153 } },
  ])(
    'should convert $hex to $expected',
    ({
      hex,
      expected,
    }: {
      hex: string
      expected: { r: number; g: number; b: number }
    }) => {
      expect(hexToRGB(hex)).toEqual(expected)
    }
  )
})
