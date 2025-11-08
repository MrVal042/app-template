import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { IColors } from '@constants'
import Icon, { IconProps } from '../Icon'

interface IConProps extends IconProps {
  alignIcon?: 'left' | 'right'
}

interface BtnProps extends TouchableOpacityProps {
  bgColor?: string
  color?: string
  label: string
  icon?: IConProps
  variant?: 'primary' | 'secondary' | 'outline'
  textStyle?: StyleProp<TextStyle>
  width?: DimensionValue
  height?: DimensionValue
}

export default function Button({
  bgColor,
  color,
  icon,
  width = '100%',
  label,
  variant = 'primary',
  style,
  textStyle,
  disabled,
  height = 48,
  ...props
}: BtnProps) {
  const isOutline = variant === 'outline'

  const btnStyle = [
    styles.btn,
    style,
    styles[variant],
    {
      backgroundColor: bgColor || styles[variant].backgroundColor,
      opacity: disabled ? 0.5 : 1,
      width,
      height,
    },
    !bgColor && isOutline && { borderColor: color || IColors.primary },
  ]

  const txtStyle = [
    {
      ...styles.text,
      color: disabled
        ? IColors.black
        : !color && isOutline
        ? IColors.primary
        : color || IColors.white,
    },
    textStyle,
  ]

  return (
    <TouchableOpacity
      {...props}
      style={btnStyle}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.content,
          {
            flexDirection: icon?.alignIcon === 'right' ? 'row-reverse' : 'row',
          },
        ]}
      >
        {icon && <Icon {...icon} color={color || IColors.white} />}
        <Text style={txtStyle}>{label}</Text>
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
  primary: {
    backgroundColor: IColors.primary,
  },
  secondary: {
    backgroundColor: IColors.secondary,
  },
  outline: {
    backgroundColor: IColors.transparent,
    borderWidth: 1,
    borderColor: IColors.primary,
  },
})
