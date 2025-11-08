import { StatusBar } from 'expo-status-bar'
import React, { useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  ColorValue,
  FlatList,
  I18nManager,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import Divider from '../../Divider'
import { IButton, IText } from '../../Element'
import Icon from '../../Icon'
import SearchField from '../SearchField'

import { useApp } from '@hooks'
import { useFocusEffect } from '@react-navigation/native'
import { searchData } from '@utils'
import useInputStyle from '../useInputStyle'

export interface DropdownItem {
  label: string
  value: string
  [key: string]: any
}

type IProps = {
  onPressItem: (item: any, index: number) => void
  isVisible: boolean
  searchItems?: boolean
  closeDropdown: () => void
  onConfirm: () => void
  itemHeight?: number
  items: DropdownItem[]
  dropdownOverlayColor?: ColorValue
  dropdownStyle?: any
  dropdownHEIGHT: number
  dropdownWIDTH: number
  dropdownPX: number
  dropdownPY: number
  rowStyle?: any
  selectedIndex: number
  disableAutoScroll?: boolean
  isLoading?: boolean
  multiple?: boolean
  selectedItems: string[]
}

export default function RenderDropdown({
  onPressItem,
  isVisible,
  closeDropdown,
  searchItems,
  items,
  onConfirm,
  itemHeight,
  dropdownHEIGHT,
  dropdownOverlayColor,
  dropdownStyle,
  dropdownWIDTH,
  dropdownPX,
  dropdownPY,
  rowStyle,
  selectedIndex,
  disableAutoScroll,
  selectedItems,
  isLoading,
  multiple,
}: IProps) {
  const { colors, isDarkMode } = useApp()
  const [query, setQuery] = useState('')
  const { inputStyles } = useInputStyle()
  const flatListRef = useRef<FlatList<DropdownItem>>(null)
  const actualItemHeight = (rowStyle?.height || itemHeight || 50) as number

  // Clear search query when items change (e.g., on focus/re-focus if desired)
  useFocusEffect(
    React.useCallback(() => {
      if (items?.length > 0) {
        setQuery('') // Clear query on focus if items are present
      }
    }, [items]) // Dependency on items
  )

  const filteredData = useMemo(() => {
    if (!searchItems || !query) {
      return items
    }
    return searchData({
      query,
      queryArr: 'label',
      queryData: items,
    })
  }, [items, query, searchItems])

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='none'
      transparent={true}
      visible={isVisible}
      onRequestClose={closeDropdown} // Good practice for Android back button
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeDropdown}
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: dropdownOverlayColor || 'rgba(0,0,0,0.4)',
            // marginTop: -60, // Check if this offset is always needed
          },
        ]}
      />
      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
        animated={true}
        translucent
      />
      {/* Hide status bar when modal is visible */}
      <View
        style={[
          inputStyles.dropdownContainer,
          dropdownStyle,
          {
            backgroundColor: isDarkMode ? colors.grey[900] : colors.background,
            maxHeight: dropdownHEIGHT,
            position: 'absolute',
            width: dropdownWIDTH,
            top: dropdownPY,
          },
          I18nManager.isRTL
            ? { right: dropdownStyle?.right || dropdownPX }
            : { left: dropdownStyle?.left || dropdownPX },
        ]}
      >
        {isLoading && (!filteredData || filteredData.length === 0) ? ( // Show loader if loading and no data yet
          <View style={inputStyles.dropdownActivityIndicatorView}>
            <ActivityIndicator
              size='small'
              color={colors.primary || '#999999'}
            />
          </View>
        ) : (
          <>
            {searchItems ? (
              <>
                <SearchField
                  value={query}
                  onChangeText={setQuery} // Debounce this for better performance on large lists
                  placeholder='Search for an item here'
                />
                <Divider space='s' />
              </>
            ) : null}
            <FlatList
              data={filteredData}
              ref={flatListRef}
              keyboardShouldPersistTaps='always'
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.value + index.toString()} // Use item.value for a more stable key
              ListEmptyComponent={
                <View style={inputStyles.emptyListView}>
                  <IText>
                    {!items || items.length === 0
                      ? 'No items available'
                      : 'No results found'}
                  </IText>
                </View>
              }
              renderItem={({ item, index }) => {
                // Find the original index in the `items` array to correctly determine `isSelected`
                // This is important because `filteredData` index might not match `items` index
                const originalItemIndex = items.findIndex(
                  (i) => i.value === item.value
                )
                const isSelected = multiple
                  ? selectedItems.includes(item.value)
                  : selectedIndex === originalItemIndex
                const backgroundColor = isSelected
                  ? colors.grey[isDarkMode ? 700 : 300]
                  : colors.grey[isDarkMode ? 800 : 200]
                const minHeight = actualItemHeight

                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onPressItem(item, originalItemIndex)}
                    style={[
                      inputStyles.dropdownRow,
                      rowStyle,
                      { minHeight, backgroundColor },
                    ]}
                  >
                    <IText numberOfLines={1} allowFontScaling={false}>
                      {item.label}
                    </IText>
                    {isSelected && (
                      <Icon
                        color={colors.success || colors.primary}
                        name={'checkbox-outline'}
                      />
                    )}
                  </TouchableOpacity>
                )
              }}
              onLayout={() => {
                if (
                  !disableAutoScroll &&
                  selectedIndex >= 0 &&
                  flatListRef.current
                ) {
                  const itemInFilteredDataIndex = filteredData.findIndex(
                    (fi) => fi.value === items[selectedIndex]?.value
                  )
                  if (itemInFilteredDataIndex >= 0) {
                    flatListRef.current.scrollToOffset({
                      animated: true,
                      offset: actualItemHeight * itemInFilteredDataIndex,
                    })
                  }
                }
              }}
              getItemLayout={(data, index) => ({
                length: actualItemHeight,
                offset: actualItemHeight * index,
                index,
              })}
              ListFooterComponent={
                multiple ? (
                  <>
                    <Divider space='l' />
                    <IButton
                      label='confirm'
                      disabled={selectedItems.length < 1}
                      onPress={onConfirm}
                    />
                  </>
                ) : null
              }
            />
          </>
        )}
      </View>
    </Modal>
  )
}
