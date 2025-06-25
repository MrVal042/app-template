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
import { IColors, useTheme } from '@constants'
import { useApp } from '@hooks'
import { useRef } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

type IKey = Partial<keyof AccountRoutes | 'isDarkMode' | 'logout'>

export default function AccountEntry() {
  const ref = useRef<Handles>(null)
  const { toggleState, navigation, user, logout } = useApp()
  const { colors, isDarkMode, rCard } = useTheme()

  const handlePress = (key: IKey) => {
    switch (key) {
      case 'isDarkMode':
        toggleState('isDarkMode')
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
      <Avatar />
      <IText variant='title' size={16}>
        {`${user?.firstName || 'Account'} ${user?.lastName || 'Name'}`}
      </IText>
      <IText>You can edit to Custom the account as you want</IText>
      <Divider />

      <FlatList
        data={data}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
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
          <Divider space='l' />
          <IButton label='Continue' onPress={logout} />
          <Divider space='s' />
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
    alignContent: 'center',
    padding: 10,
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.2,
  },
  toggle: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
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
  // {
  //   label: 'Notifications settings',
  //   key: 'NotificationSettings',
  //   isToggle: false,
  // },
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
