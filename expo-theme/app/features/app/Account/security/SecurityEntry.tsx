import {
  Divider,
  Handles,
  IBottomSheet,
  IButton,
  Icon,
  IText,
  RootContainer,
} from '@components'
import { IColors } from '@constants'
import { useApp } from '@hooks'
import { StackNavigationProps } from '@navigation'
import { useRef } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useAuth } from '@store'

type IKey = Partial<keyof AccountRoutes | 'autoLogin' | 'deleteAccount'>

export default function SecurityEntry({
  navigation,
}: StackNavigationProps<AccountRoutes, 'Security'>) {
  const { colors, isDarkMode } = useApp()
  const { autoLogin, toggleAutoLogin } = useAuth()
  const bottomSheetRef = useRef<Handles>(null)

  const handlePress = (key: IKey) => {
    switch (key) {
      case 'autoLogin':
        toggleAutoLogin()
        return
      case 'deleteAccount':
        bottomSheetRef.current?.snapTo(2)
        return
      default:
        navigation.navigate(key)
        return
    }
  }

  return (
    <RootContainer title='Security'>
      <FlatList
        data={securityOptions}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => {
          const backgroundColor = IColors.grey[isDarkMode ? 900 : 100]
          const check = Boolean(item.key === 'autoLogin')
            ? autoLogin
            : isDarkMode
          const color =
            item.key === 'DeleteAccount' ? colors.dangerDark : colors.text
          return (
            <TouchableOpacity
              style={[styles.item, { backgroundColor }]}
              onPress={() => handlePress(item.key)}
            >
              <IText size={16} color={color}>
                {item.label}
              </IText>
              <View style={styles.toggle}>
                {item.isToggle ? (
                  <Icon
                    name={check ? 'toggle-on' : 'toggle-off'}
                    color={check ? IColors.success : colors.text}
                  />
                ) : (
                  <Icon name='chevron-right' color={color} />
                )}
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <IBottomSheet ref={bottomSheetRef}>
        <IText variant='bold' size={18} textAlign='center'>
          Delete account?
        </IText>
        <Divider />
        <IText textAlign='center'>
          Deleting account will permanently remove you from our system
        </IText>
        <Divider space='l' />
        <IButton
          label='Continue'
          onPress={() => bottomSheetRef.current?.handleClose()}
        />
        <Divider space='xs' />
        <IButton
          label='Cancel'
          variant='outline'
          color={colors.dangerDark}
          onPress={() => bottomSheetRef.current?.handleClose()}
        />
        <Divider />
      </IBottomSheet>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    padding: 15,
  },
  toggle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
})

const securityOptions: { label: string; key: IKey; isToggle?: boolean }[] = [
  {
    label: 'Auto login',
    key: 'autoLogin',
    isToggle: true,
  },
  {
    label: 'Change Password',
    key: 'ChangePassword',
  },
  {
    label: 'Security Settings',
    key: 'Security',
  },
  {
    label: 'Delete Account',
    key: 'deleteAccount',
  },
]
