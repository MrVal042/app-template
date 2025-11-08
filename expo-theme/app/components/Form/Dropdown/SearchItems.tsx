import { Divider, IText, Icon } from '@components'
import { useApp } from '@hooks'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import useInputStyle from '../useInputStyle'

const { height } = Dimensions.get('window')

interface ISearchItemsProps {
  data: string[]
  onSelect?: (x: string) => void
  setBottomSheetHeight: (
    value: React.SetStateAction<number | undefined>
  ) => void
}

export default function SearchItems({
  data,
  setBottomSheetHeight,
  onSelect,
}: ISearchItemsProps) {
  const { colors } = useApp()
  const { inputStyles } = useInputStyle()
  const [queryText, setQueryText] = useState('')
  const [autoFocus, setAutoFocus] = useState(false)
  const [searchedData, setSearchData] = useState<string[]>(data)

  useEffect(() => {
    const subscribe = () => {
      if (queryText) {
        const searchResult = searchedData.filter((contact) => {
          const itemData = contact.toLowerCase()
          const textData = queryText.toLowerCase()

          return itemData.indexOf(textData) > -1
        })
        setSearchData(searchResult)

        return
      } else {
        setSearchData(data)
      }
    }
    subscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, queryText])

  return (
    <Pressable>
      <View
        style={[
          inputStyles.inputWrap,
          {
            flexDirection: 'row',
          },
        ]}
      >
        <Icon name='search' />
        <TextInput
          value={queryText}
          autoFocus={autoFocus}
          placeholder='Search for an item'
          onFocus={() => {
            setAutoFocus(true)
            setBottomSheetHeight(height / 1.5)
          }}
          onBlur={() => setBottomSheetHeight(height / 2)}
          onChangeText={(txt) => setQueryText(txt)}
          onEndEditing={() => setQueryText('')}
          placeholderTextColor={colors.grey[500]}
          style={{
            width: '87%',
            color: colors.black,
            height: 40,
            fontSize: 16,
            alignItems: 'flex-start',
          }}
        />
      </View>
      <FlatList
        data={searchedData}
        keyboardShouldPersistTaps='always'
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View
            style={[
              inputStyles.dropdownActivityIndicatorView,
              {
                paddingTop: 30,
              },
            ]}
          >
            <IText color={colors.dangerDark}>
              Item not found, please create listing
            </IText>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setQueryText('')
              setAutoFocus(false)
              onSelect && onSelect(item)
            }}
            style={[
              inputStyles.dropdownRow,
              {
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                width: '100%',
              },
            ]}
          >
            <Icon name='check-square' />
            <Divider horizontal space='s' />
            <IText
              numberOfLines={1}
              allowFontScaling={false}
              style={{ width: '80%' }}
              textAlign='left'
            >
              {item}
            </IText>
          </TouchableOpacity>
        )}
      />
    </Pressable>
  )
}
