import { width } from '@constants'
import { useTheme } from '@hooks'
import Animated from 'react-native-reanimated'
import {
  StyleProp,
  TextStyle,
  PixelRatio,
  TextProps as RNTextProps,
} from 'react-native'

const guidelineBaseWidth = 375

const scaleFont = (size: number) => {
  const scale = width / guidelineBaseWidth
  return Math.round(PixelRatio.roundToNearestPixel(size * scale))
}

type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify'
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase'
type TextVariant =
  | 'regular'
  | 'bold'
  | 'semibold'
  | 'title'
  | 'light'
  | 'extraBold'

interface Props extends RNTextProps {
  textTransform?: TextTransform
  style?: StyleProp<TextStyle>
  textAlign?: TextAlign
  variant?: TextVariant
  color?: string
  size?: number
}

const fontFamilyMap: Record<TextVariant, string> = {
  extraBold: 'System',
  semibold: 'System',
  regular: 'System',
  light: 'System',
  title: 'System',
  bold: 'System',
}

const fontWeightMap: Record<TextVariant, TextStyle['fontWeight']> = {
  extraBold: '900',
  semibold: '600',
  regular: '400',
  light: '200',
  title: '700',
  bold: '800',
}

export default function ThemeText({
  textTransform = 'none',
  variant = 'regular',
  textAlign = 'left',
  size = 14,
  ...rest
}: Props) {
  const { colors } = useTheme()

  return (
    <Animated.Text
      {...rest}
      style={[
        {
          fontSize: scaleFont(variant === 'light' ? 12 : size),
          fontFamily: fontFamilyMap[variant],
          fontWeight: fontWeightMap[variant],
          color: rest.color || colors.text,
          textTransform,
          textAlign,
        },
        rest.style,
      ]}
    />
  )
}
