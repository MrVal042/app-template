import React, { Ref } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import {
  DimensionValue,
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { useApp } from '@hooks'
import Icon from '../Icon'
import DatePicker, { DateProps } from './DatePicker'
import { ItemPicker, PickerProps } from './Dropdown'
import FormInput from './FormInput'
import useInputStyle, { IRules } from './useInputStyle'

interface BaseFormFieldProps<T extends FieldValues>
  extends Omit<TextInputProps, 'style'> {
  name: Path<T>
  label?: string
  control: Control<T>
  rules?: IRules<T>
  style?: StyleProp<ViewStyle>
  marginBottom?: number
  width?: DimensionValue
  height?: DimensionValue
  isEditable?: boolean
  isRequired?: boolean
  bottomInfo?: React.ReactElement
  keyboardType?: KeyboardTypeOptions
  leftAdornment?: React.ReactElement
  rightAdornment?: React.ReactElement
  multiline?: boolean
  multiple?: boolean
  defaultValue?: PathValue<T, Path<T>>
  inputRef?: Ref<TextInput> | null
}

type FormFieldProps<T extends FieldValues> =
  | (BaseFormFieldProps<T> & { type: 'input' })
  | (BaseFormFieldProps<T> & DateProps<T> & { type: 'date' })
  | (BaseFormFieldProps<T> & PickerProps<T> & { type: 'picker' })

export default function FormField<T extends FieldValues>(
  props: FormFieldProps<T>
) {
  const {
    name,
    control,
    rules,
    secureTextEntry,
    type,
    multiline,
    defaultValue,
    inputRef,
  } = props
  const { colors } = useApp()
  const { inputStyles } = useInputStyle()
  const [showPassword, setShowPassword] = React.useState(false)

  switch (type) {
    case 'input':
      return (
        <Controller
          name={name}
          rules={rules}
          control={control}
          render={({ field, fieldState }) => {
            const error = fieldState.error?.message
            return (
              <FormInput
                {...props}
                {...field}
                error={error}
                inputRef={inputRef}
                multiline={multiline}
                onChangeText={field.onChange}
                value={field.value || defaultValue}
                secureTextEntry={secureTextEntry && !showPassword}
                autoComplete={
                  props.autoComplete || name.toLowerCase() === 'email'
                    ? 'email'
                    : 'off'
                }
                rightAdornment={
                  secureTextEntry && (
                    <TouchableOpacity
                      onPress={() => setShowPassword((prev) => !prev)}
                      style={inputStyles.iconWrap}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  )
                }
              />
            )
          }}
        />
      )
    case 'picker':
      //@ts-ignore
      return <ItemPicker {...props} />

    case 'date':
      return <DatePicker {...props} />

    default:
  }
}
