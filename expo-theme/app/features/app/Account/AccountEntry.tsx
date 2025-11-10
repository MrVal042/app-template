import {
  Avatar,
  Divider,
  Handles,
  IBottomSheet,
  IButton,
  Icon,
  IText,
  RootContainer,
} from '@components'
import { IColors } from '@constants'
import { useApp, useTheme } from '@hooks'
import { useRef } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAuth } from '@store'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

type IKey = Partial<keyof AccountRoutes | 'isDarkMode' | 'logout'>

export default function AccountEntry() {
  const ref = useRef<Handles>(null)
  const { user, logout } = useAuth()
  const { toggleTheme, navigation } = useApp()
  const { colors, isDarkMode, rCard } = useTheme()

  const handlePress = (key: IKey) => {
    switch (key) {
      case 'isDarkMode':
        toggleTheme()
        break
      case 'logout':
        ref.current?.snapTo(1)
        break
      default:
        navigation.navigate('AccountNavigator', { screen: key })
    }
  }

  return (
    <RootContainer title='Account'>
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Avatar />
            <IText variant='title' size={16}>
              {`${user?.first_name || 'Account'} ${user?.last_name || 'Name'}`}
            </IText>
            <IText>You can edit to Custom the account as you want</IText>
            <Divider space='xxs' />
          </View>
        }
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => {
          const check = Boolean(item.key === 'isDarkMode')
            ? isDarkMode
            : isDarkMode
          const isLogout = item.key === 'logout'
          return (
            <AnimatedTouchableOpacity
              style={[styles.item, rCard]}
              onPress={() => handlePress(item.key)}
            >
              <IText size={16}>{item.label}</IText>
              <View style={styles.toggle}>
                {item.isToggle ? (
                  <Icon
                    name={check ? 'toggle-on' : 'toggle-off'}
                    color={check ? IColors.success : colors.text}
                  />
                ) : (
                  <Icon
                    name={isLogout ? 'log-out-outline' : 'chevron-right'}
                    color={isLogout ? colors.dangerDark : colors.text}
                  />
                )}
              </View>
            </AnimatedTouchableOpacity>
          )
        }}
      />
      <IBottomSheet ref={ref}>
        <View>
          <IText textAlign='center'>Are you sure you want to logout?</IText>
          <Divider space='xl' />
          <IButton label='Continue' onPress={logout} />
          <IButton
            label='Cancel'
            variant='outline'
            color={IColors.dangerDark}
            onPress={() => ref.current?.handleClose()}
          />
          <Divider />
        </View>
      </IBottomSheet>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.2,
  },
  toggle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
})

const data: { label: string; key: IKey; isToggle?: boolean }[] = [
  {
    label: 'Dark mode',
    key: 'isDarkMode',
    isToggle: true,
  },
  {
    label: 'Profile',
    key: 'Profile',
    isToggle: false,
  },
  {
    label: 'Security',
    key: 'Security',
    isToggle: false,
  },
  {
    label: 'Help & Support',
    key: 'HelpSupport',
    isToggle: false,
  },
  {
    label: 'Logout',
    key: 'logout',
  },
]
