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
import { useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function AccountEntry() {
  const { logout } = useApp()
  const ref = useRef<Handles>(null)

  return (
    <RootContainer title='Account'>
      <IText variant='title' size={16}>
        Account
      </IText>

      <TouchableOpacity
        style={styles.item}
        onPress={() => ref.current?.snapTo(1)}
      >
        <IText size={16}>Logout</IText>
        <View style={styles.toggle}>
          <Icon name={'log-out-outline'} color={IColors.dangerDark} />
        </View>
      </TouchableOpacity>

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
