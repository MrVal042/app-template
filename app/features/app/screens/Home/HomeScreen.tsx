import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Icon, IText, RootContainer } from '@components'
import { IColors } from '@constants'
import { useApp } from '@hooks'

const avatarSize = 30

export default function HomeScreen() {
  const { colors, isDarkMode, navigation } = useApp()

  return (
    <RootContainer
      leftAdornment={
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.avatar}
          onPress={() => navigation.navigate('Tabs', { screen: 'Account' })}
        >
          <Icon
            name={isDarkMode ? 'user-circle' : 'user-circle-o'}
            color={colors.text}
            size={avatarSize}
          />
        </TouchableOpacity>
      }
      rightAdornment={
        <TouchableOpacity>
          <Icon name='bell' color={colors.text} />
        </TouchableOpacity>
      }
    >
      <View style={styles.container}>
        <IText textAlign='left' variant='title' size={18}>
          Welcome to HomeScreen
        </IText>
      </View>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 0.3,
    borderColor: IColors.text,
    borderRadius: avatarSize / 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
