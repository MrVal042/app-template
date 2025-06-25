import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Icon, IText, RootContainer, IButton } from '@components'
import { IColors } from '@constants'
import { useApp } from '@hooks'

const avatarSize = 30

export default function HomeScreen() {
  const { colors, isDarkMode, navigation } = useApp()

  return (
    <RootContainer
      leftAdornment={
        <View style={styles.avatar}>
          <Icon
            name={isDarkMode ? 'user-circle' : 'user-circle-o'}
            color={colors.text}
            size={avatarSize}
          />
        </View>
      }
      rightAdornment={
        <TouchableOpacity>
          <Icon name='bell' color={colors.text} />
        </TouchableOpacity>
      }
    >
      <IText textAlign='left' variant='title' size={18}>
        Welcome to HomeScreen
      </IText>
      <IButton
        label='Go account'
        onPress={() => navigation.navigate('Tabs', { screen: 'Account' })}
      />
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 0.3,
    borderColor: IColors.text,
    borderRadius: avatarSize / 2,
  },
})
