import { Dimensions, PixelRatio } from 'react-native'

const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  largeTitle: 32,
}

const { width, height } = Dimensions.get('window')

// Utility to scale values
export const scale = (size: number) => {
  const scaleFactor = width / 375 // base screen size
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor))
}

export const input = {
  height: scale(45),
  padding: scale(10),
  fontSize: scale(16),
  borderRadius: scale(6),
  marginBottom: scale(20),
}

export const SPACING = {
  xxs: scale(2.5),
  xs: scale(5),
  s: scale(7.5),
  m: scale(12.5),
  l: scale(17),
  xl: scale(22),
  xxl: scale(28),
  xxxl: scale(33),
  default: scale(10),
}

export { height, SIZES, width }
