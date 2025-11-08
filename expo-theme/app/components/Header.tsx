import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { useTheme } from '@hooks'
import { IText, IView } from './Element'
import Icon from './Icon'

interface IHeader {
  leftAdornment?: React.ReactNode
  rightAdornment?: React.ReactNode
  hideGoBack?: boolean
  title?: string
}

export default function Header({
  leftAdornment,
  rightAdornment,
  hideGoBack,
  title,
}: IHeader) {
  const { colors, isDarkMode } = useTheme()
  const navigation = useNavigation()
  const showNav = Boolean(!hideGoBack && navigation.canGoBack())

  return (
    <IView
      style={[
        styles.wrap,
        {
          borderColor: isDarkMode ? colors.primary : colors.primaryDark,
          justifyContent:
            !showNav && !title && !rightAdornment
              ? 'flex-end'
              : 'space-between',
        } as ViewStyle,
      ]}
    >
      {leftAdornment ? (
        leftAdornment
      ) : showNav ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 10 }}
        >
          <Icon
            color={colors.text}
            name='chevron-left'
            variant='Entypo'
            size={25}
          />
        </TouchableOpacity>
      ) : (
        <IView style={{ width: 30 }} />
      )}

      <IText
        size={20}
        variant='title'
        style={[styles.title, { color: colors.text }]}
      >
        {title}
      </IText>
      {rightAdornment || <IView style={{ width: 30 }} />}
    </IView>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  } as TextStyle,
})
