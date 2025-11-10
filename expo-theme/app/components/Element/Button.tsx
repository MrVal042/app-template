import {
  ActivityIndicator,
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import Icon, { IconProps } from '../Icon'
import { useTheme } from '@hooks'

interface IConProps extends IconProps {
  alignIcon?: 'left' | 'right'
}

interface BtnProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline'
  textStyle?: StyleProp<TextStyle>
  height?: DimensionValue
  width?: DimensionValue
  marginBottom?: number
  isLoading?: boolean
  marginTop?: number
  icon?: IConProps
  bgColor?: string
  color?: string
  label: string
}

export default function Button({
  variant = 'primary',
  marginBottom = 15,
  width = '100%',
  height = 48,
  textStyle,
  isLoading,
  marginTop,
  disabled,
  bgColor,
  color,
  label,
  style,
  icon,
  ...props
}: BtnProps) {
  const { colors, isDarkMode } = useTheme()

  const styleMap = {
    primary: {
      backgroundColor: disabled ? colors.grey[500] : bgColor || colors.button,
      color: disabled
        ? colors.black
        : color
        ? color
        : isDarkMode
        ? colors.black
        : colors.white,
      borderColor: undefined,
    },
    secondary: {
      backgroundColor: disabled
        ? colors.grey[500]
        : bgColor || colors.secondaryDark,
      borderColor: undefined,
      color: disabled
        ? colors.black
        : color
        ? color
        : isDarkMode
        ? colors.black
        : colors.white,
    },
    outline: {
      borderWidth: 1,
      backgroundColor: colors.transparent,
      borderColor: disabled ? colors.grey[500] : color || colors.activeColor,
      color: disabled ? colors.grey[500] : color || colors.activeColor,
    },
  }

  const btnStyle = [
    styles.btn,
    style,
    styleMap[variant],
    {
      opacity: disabled ? 0.5 : 1,
      marginTop,
      height,
      width,
      marginBottom,
    },
  ]

  const txtStyles = [
    {
      ...styles.text,
      color: styleMap[variant].color,
    },
    textStyle,
  ]

  return (
    <TouchableOpacity
      {...props}
      style={btnStyle}
      activeOpacity={0.8}
      disabled={isLoading || disabled}
    >
      <View
        style={[
          styles.content,
          {
            flexDirection: icon?.alignIcon === 'right' ? 'row-reverse' : 'row',
          },
        ]}
      >
        {icon && <Icon {...icon} color={styleMap[variant].color} />}
        <Text style={txtStyles}>
          {isLoading ? (
            <ActivityIndicator color={styleMap[variant].color} />
          ) : (
            label
          )}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  text: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
})
