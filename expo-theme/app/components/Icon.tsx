import { scale } from '@constants'
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
import { duration, useTheme } from '@hooks'
import type { ComponentProps } from 'react'
import { useEffect } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

// Icon variant type
type IconVariant =
  | 'MaterialIcons'
  | 'Ionicons'
  | 'Feather'
  | 'FontAwesome'
  | 'Entypo'

// Specific icon name types for each variant
type MaterialIconsName = ComponentProps<typeof MaterialIcons>['name']
type IoniconsName = ComponentProps<typeof Ionicons>['name']
type FeatherName = ComponentProps<typeof Feather>['name']
type FontAwesomeName = ComponentProps<typeof FontAwesome>['name']
type EntypoName = ComponentProps<typeof Entypo>['name']

// Main icon props
export interface IconProps {
  variant?: IconVariant
  name:
    | IoniconsName
    | MaterialIconsName
    | FeatherName
    | FontAwesomeName
    | EntypoName
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

// Helper to check if name exists in a glyph map
const iconExists = (glyphMap: Record<string, unknown>, name: string) =>
  Object.prototype.hasOwnProperty.call(glyphMap, name)

// Detect the icon set based on the name
const detectIconSet = (name: string): IconVariant => {
  if (iconExists(Ionicons.glyphMap, name)) return 'Ionicons'
  if (iconExists(Feather.glyphMap, name)) return 'Feather'
  if (iconExists(FontAwesome.glyphMap, name)) return 'FontAwesome'
  if (iconExists(MaterialIcons.glyphMap, name)) return 'MaterialIcons'
  return 'Entypo'
}

// Create animated versions of the icon components
const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons)
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons)
const AnimatedFeather = Animated.createAnimatedComponent(Feather)
const AnimatedFontAwesome = Animated.createAnimatedComponent(FontAwesome)
const AnimatedEntypo = Animated.createAnimatedComponent(Entypo)

export default function Icon({
  name,
  variant,
  size = 24,
  color,
  style,
}: IconProps) {
  const { isDarkMode, colors } = useTheme()
  const progress = useSharedValue(isDarkMode ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isDarkMode ? 1 : 0, {
      duration,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode])

  const rColor = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [color || colors.black, color || colors.white] // Using danger colors for demonstration
    ),
  }))

  const resolvedVariant: IconVariant = variant ?? detectIconSet(name)

  const commonProps = {
    name: name as IconProps['name'],
    size: scale(size),
    style: [rColor, style],
  }

  switch (resolvedVariant) {
    case 'MaterialIcons':
      return (
        <AnimatedMaterialIcons
          {...commonProps}
          name={name as MaterialIconsName}
        />
      )
    case 'Feather':
      return <AnimatedFeather {...commonProps} name={name as FeatherName} />
    case 'FontAwesome':
      return (
        <AnimatedFontAwesome {...commonProps} name={name as FontAwesomeName} />
      )
    case 'Entypo':
      return <AnimatedEntypo {...commonProps} name={name as EntypoName} />
    case 'Ionicons':
    default:
      return <AnimatedIonicons {...commonProps} name={name as IoniconsName} />
  }
}
