import { height, input, useTheme } from '@constants'
import React, { Ref } from 'react'
import {
  DimensionValue,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import { IText } from '../Element'
import LabelInput from './LabelInput'
import useInputStyle from './useInputStyle'

interface InputProps extends Omit<TextInputProps, 'style'> {
  style?: StyleProp<ViewStyle>
  label?: string
  error?: string
  rightAdornment?: React.ReactNode
  marginBottom?: DimensionValue
  inputRef?: Ref<TextInput>
}

export default function Input({
  label,
  style,
  error,
  placeholder,
  secureTextEntry,
  multiline,
  marginBottom = input.marginBottom,
  rightAdornment,
  autoComplete,
  inputRef,
  ...props
}: InputProps) {
  const { colors } = useTheme()
  const { inputStyles } = useInputStyle()

  return (
    <View style={[inputStyles.container, { marginBottom }]}>
      <LabelInput {...{ label }} />
      <View
        style={[
          inputStyles.inputWrap,
          { height: multiline ? height * 0.13 : 50 },
          style,
        ]}
      >
        <TextInput
          {...props}
          ref={inputRef}
          autoCorrect={false}
          autoCapitalize='none'
          multiline={multiline}
          style={inputStyles.input}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.grey[500]}
          numberOfLines={multiline ? 6 : undefined}
          placeholder={placeholder || `Enter your ${label}`}
        />
        {rightAdornment}
      </View>
      {error ? (
        <IText color={colors.danger} textAlign='right' size={12}>
          {error}
        </IText>
      ) : null}
    </View>
  )
}
