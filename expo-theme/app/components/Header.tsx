import { useNavigation } from '@react-navigation/native'
import { IText, IView } from './Element'
import { useTheme } from '@hooks'
import Icon from './Icon'
import React from 'react'
import {
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

interface IHeader {
  leftAdornment?: React.ReactNode
  rightAdornment?: React.ReactNode
  hideGoBack?: boolean
  hideLine?: boolean
  title?: string
}

export default function Header({
  rightAdornment,
  leftAdornment,
  hideGoBack,
  hideLine,
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
          borderBottomWidth: hideLine ? 0 : 0.2,
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
    marginBottom: -15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  } as TextStyle,
})
