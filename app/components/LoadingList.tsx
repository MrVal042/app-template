import { useApp } from '@hooks'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Icon from './Icon'
import { shadowStyles } from './shadowStyle'
import Skeletal from './Skeletal'

export default function LoadingList({
  customItem,
  numberOfItems = 10,
}: {
  customItem?: React.ReactElement
  numberOfItems?: number
}) {
  const { colors, isDarkMode } = useApp()
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => String(index)}
      renderItem={() => {
        return (
          customItem || (
            <View
              style={[
                styles.container,
                {
                  backgroundColor: isDarkMode
                    ? colors.background
                    : colors.white,
                  shadowColor: isDarkMode ? colors.text : colors.black,
                },
              ]}
            >
              <View
                style={[
                  styles.img,
                  {
                    backgroundColor: isDarkMode
                      ? colors.grey[800]
                      : colors.grey[200],
                  },
                ]}
              >
                <Icon
                  name='images-outline'
                  size={50}
                  color={colors.grey[500]}
                />
              </View>
              <View>
                <Skeletal width={'40%'} />
                <View style={styles.flexWrap}>
                  <Skeletal width={'25%'} />
                  <Skeletal width={'25%'} />
                </View>
              </View>
            </View>
          )
        )
      }}
      data={Array(numberOfItems)
        .fill('')
        .map((_, index) => ({ id: index }))}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 30,
    maxHeight: 380,
    ...shadowStyles,
    margin: 5,
  },
  img: {
    width: '100%',
    minHeight: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    marginBottom: 5,
  },
  footer: {
    gap: 20,
    marginTop: 10,
    height: 50,
    overflow: 'scroll',
    borderTopWidth: 0.2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
