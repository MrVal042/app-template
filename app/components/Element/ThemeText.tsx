// ThemeText.tsx
import { useTheme, width } from '@constants'
import {
  PixelRatio,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'

const guidelineBaseWidth = 375
const scaleFont = (size: number) => {
  const scale = width / guidelineBaseWidth
  return Math.round(PixelRatio.roundToNearestPixel(size * scale))
}

type TextVariant = 'regular' | 'bold' | 'semibold' | 'title' | 'light'
type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify'
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase'

interface Props extends RNTextProps {
  size?: number
  color?: string | Animated.SharedValue<string>
  textAlign?: TextAlign
  textTransform?: TextTransform
  variant?: TextVariant
  style?: StyleProp<TextStyle>
}

const fontFamilyMap: Record<TextVariant, string> = {
  light: 'System',
  regular: 'System',
  bold: 'System',
  semibold: 'System',
  title: 'System',
}

const fontWeightMap: Record<TextVariant, TextStyle['fontWeight']> = {
  light: '300',
  regular: '400',
  semibold: '600',
  bold: '700',
  title: '700',
}

export default function ThemeText({
  size = 14,
  color,
  textAlign = 'left',
  textTransform = 'none',
  variant = 'regular',
  style,
  ...rest
}: Props) {
  const { rColor } = useTheme()

  // If color is provided as a string, use it directly
  // Otherwise use the animated text color from the theme
  const colorStyle = typeof color === 'string' ? { color } : rColor

  return (
    <Animated.Text
      {...rest}
      style={[
        {
          textAlign,
          textTransform,
          fontSize: scaleFont(size),
          fontFamily: fontFamilyMap[variant],
          fontWeight: fontWeightMap[variant],
        },
        colorStyle,
        style,
      ]}
    />
  )
}
