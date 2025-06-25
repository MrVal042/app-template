import { useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { input, useTheme } from '@constants'
import { IButton, IText } from '../Element'
import LabelInput from './LabelInput'
import useInputStyle, { IRules } from './useInputStyle'

export interface DateProps<T extends FieldValues> {
  control?: Control<T>
  rules?: IRules<T>
  label?: string
  name: Path<T>
  onBlur?: () => void
  defaultValue?: PathValue<T, Path<T>>
  marginBottom?: number
}

export default function DatePicker<T extends FieldValues>({
  name,
  label,
  control,
  rules,
  defaultValue,
  onBlur,
  marginBottom = input.marginBottom,
}: DateProps<T>) {
  const [show, setShow] = useState(false)
  const { colors, isDarkMode } = useTheme()
  const { inputStyles } = useInputStyle()

  const closeDropdown = () => {
    setShow(false)
    onBlur?.()
  }

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        return (
          <View style={inputStyles.container}>
            <LabelInput {...{ label }} />
            <TouchableOpacity
              style={inputStyles.inputWrap}
              onPress={() => setShow(true)}
              activeOpacity={0.8}
            >
              <IText>
                {field.value
                  ? new Date(field.value).toDateString()
                  : `Select ${label}`}
              </IText>
            </TouchableOpacity>

            <DateTimePickerModal
              mode='date'
              isVisible={show}
              date={defaultValue}
              textColor={colors.text}
              onCancel={closeDropdown}
              onConfirm={(date: any) => {
                field.onChange(date)
                closeDropdown()
              }}
              isDarkModeEnabled={isDarkMode}
              buttonTextColorIOS={colors.primary}
              modalStyleIOS={{ marginBottom: 30 }}
              pickerStyleIOS={{ alignItems: 'center' }}
              customCancelButtonIOS={({ onPress }: { onPress: () => void }) => (
                <IButton label='Cancel' onPress={onPress} />
              )}
              customConfirmButtonIOS={({
                onPress,
              }: {
                onPress: () => void
              }) => (
                <IButton
                  label='Confirm'
                  onPress={onPress}
                  style={{
                    width: '90%',
                    marginBottom: 10,
                    alignSelf: 'center',
                  }}
                />
              )}
            />
            {error ? (
              <IText color={colors.danger} textAlign='right' size={12}>
                {error}
              </IText>
            ) : null}
          </View>
        )
      }}
    />
  )
}
