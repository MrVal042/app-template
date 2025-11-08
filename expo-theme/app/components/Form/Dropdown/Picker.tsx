import React, { useEffect, useRef, useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import {
  ActivityIndicator,
  ColorValue,
  DimensionValue,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { height, input } from '@constants'
import { IText } from '../../Element'
import Icon from '../../Icon'
import LabelInput from '../LabelInput'
import useInputStyle, { IRules } from '../useInputStyle'
import RenderDropdown, { DropdownItem } from './RenderDropdown'
import { calculateDropdownHeight, isExist } from './helper'
import { useTheme } from '@hooks'

export interface PickerProps<T extends FieldValues> {
  onSelect?: (value: string, index?: number) => void
  defaultValue?: PathValue<T, Path<T>>
  dropdownOverlayColor?: ColorValue
  statusBarTranslucent?: boolean
  defaultValueByIndex?: number
  style?: StyleProp<ViewStyle>
  disableAutoScroll?: boolean
  dropdownHeight?: number
  width?: DimensionValue
  items: DropdownItem[]
  marginBottom?: number
  searchItems?: boolean
  placeholder?: string
  isEditable?: boolean
  onFocus?: () => void
  dropdownStyle?: any
  onBlur?: () => void
  isRequired?: boolean
  control?: Control<T>
  isLoading?: boolean
  itemHeight?: number
  rules?: IRules<T>
  label?: string
  rowStyle?: any
  name: Path<T>
  multiple?: boolean
}

const Picker = <T extends FieldValues>({
  dropdownHeight = height / 1.8,
  placeholder,
  onSelect,
  items,
  label,
  width,
  isEditable = true,
  isLoading,
  dropdownOverlayColor,
  disableAutoScroll,
  defaultValueByIndex,
  onFocus,
  onBlur,
  defaultValue,
  name,
  style,
  isRequired,
  itemHeight = 40,
  control,
  dropdownStyle,
  searchItems,
  rowStyle,
  rules,
  multiple,
  marginBottom = input.marginBottom,
}: PickerProps<T>) => {
  const { colors } = useTheme()
  const { inputStyles } = useInputStyle()
  const [dropdownPX, setDropdownPX] = useState(0)
  const [dropdownPY, setDropdownPY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  //@ts-ignore
  const touchableRef = useRef<TouchableOpacity>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const [dropdownHEIGHT, setDropdownHEIGHT] = useState(() =>
    calculateDropdownHeight({
      dataLength: items?.length || 0,
      dropdownHeight,
      itemHeight,
    })
  )
  const [dropdownWIDTH, setDropdownWIDTH] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Reset if items array becomes empty
  useEffect(() => {
    if (!items || items.length === 0) {
      reset()
    }
  }, [items])

  // Effect to set initial selection based on defaultValueByIndex prop
  useEffect(() => {
    if (
      items &&
      defaultValueByIndex !== undefined &&
      items[defaultValueByIndex]
    ) {
      setSelectedIndex(defaultValueByIndex)
    }
  }, [items, defaultValueByIndex])

  // Effect to update selectedIndex when the 'value' prop changes (e.g., from react-hook-form)
  useEffect(() => {
    if (isExist(defaultValue) && items) {
      const index = items.findIndex((item) => item.value === defaultValue)
      if (index >= 0) {
        setSelectedIndex(index)
      } else {
        setSelectedIndex(-1)
      }
    } else if (!isExist(defaultValue)) {
      setSelectedIndex(-1)
    }
  }, [defaultValue, items])

  useEffect(() => {
    setDropdownHEIGHT(
      calculateDropdownHeight({
        dataLength: items?.length || 0,
        dropdownHeight,
        itemHeight,
      })
    )
  }, [dropdownHeight, itemHeight, items])

  const openDropdown = () => {
    if (!isEditable) return
    touchableRef?.current?.measure(
      (_fx: any, _fy: any, w: any, h: any, px: any, py: number) => {
        const spaceBelow = height - (py + h)
        const spaceAbove = py
        if (
          spaceBelow < dropdownHEIGHT + 20 &&
          spaceAbove > dropdownHEIGHT + 20
        ) {
          setDropdownPY(py - dropdownHEIGHT - 2) // -2 for small gap
        } else {
          setDropdownPY(py + h + 2)
        }
        setDropdownPX(px)
        setDropdownWIDTH((width as number) || w)
        setIsVisible(true)
        onFocus?.()
      }
    )
  }

  const closeDropdown = () => {
    setIsVisible(false)
    onBlur?.()
  }

  const reset = () => setSelectedIndex(-1)
  const dropdownProps = {
    isVisible,
    closeDropdown,
    dropdownHEIGHT,
    dropdownPX,
    dropdownPY,
    dropdownWIDTH,
    items,
    selectedIndex,
    disableAutoScroll,
    dropdownOverlayColor,
    dropdownStyle,
    isLoading,
    itemHeight,
    selectedItems,
    rowStyle,
    searchItems,
    multiple,
  }
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        const placeholderText = placeholder || `Select ${label || name}`

        const displayValue = (() => {
          const { value } = field
          if (multiple && Array.isArray(value)) {
            return value.length > 0
              ? value.map((list: string) => (
                  <IText key={String(list)} textTransform='capitalize'>
                    {`${list || placeholderText}${
                      value.length > 1 ? ', ' : ''
                    }`}
                  </IText>
                ))
              : defaultValue || placeholderText
          }
          return value || defaultValue || placeholderText
        })()

        return (
          <>
            <TouchableOpacity
              ref={touchableRef}
              activeOpacity={0.8}
              onPress={openDropdown}
              disabled={!isEditable || isLoading}
              style={[inputStyles.container, style, { marginBottom }]}
            >
              {label && <LabelInput label={label} isRequired={isRequired} />}
              <View style={inputStyles.inputWrap}>
                <View
                  style={[
                    inputStyles.input,
                    { justifyContent: 'center', height: input.height },
                  ]}
                >
                  <IText textTransform='capitalize'>{displayValue}</IText>
                </View>
                {isLoading ? (
                  <ActivityIndicator
                    style={inputStyles.indicator}
                    color={colors.primary}
                  />
                ) : (
                  <Icon
                    color={colors.text}
                    style={inputStyles.dropdownIcon}
                    name={
                      !isEditable
                        ? 'lock'
                        : isVisible
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                  />
                )}
              </View>
              {error && <IText style={inputStyles.errorText}>{error}</IText>}
            </TouchableOpacity>

            {isVisible && (
              <RenderDropdown
                {...dropdownProps}
                onConfirm={() => {
                  closeDropdown()
                }}
                onPressItem={(item, index) => {
                  if (multiple) {
                    setSelectedItems((prev) => {
                      const isExist = prev.includes(item.value)
                      if (isExist) {
                        const filteredItem = prev.filter(
                          (lst) => lst !== item.value
                        )
                        field.onChange(filteredItem) // Update react-hook-form field
                        return filteredItem
                      }
                      const newItem = [...prev, item.value]
                      field.onChange(newItem) // Update react-hook-form field
                      return newItem
                    })
                    return
                  }
                  field.onChange(item.value) // Update react-hook-form field
                  closeDropdown()
                  onSelect?.(item.value, index)
                  setSelectedIndex(index) // Set selected index based on original items array
                }}
              />
            )}
          </>
        )
      }}
    />
  )
}

export default React.memo(Picker)
