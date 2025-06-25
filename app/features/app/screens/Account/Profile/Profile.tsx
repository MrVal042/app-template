import {
  Avatar,
  Divider,
  IButton,
  Icon,
  IText,
  RootContainer,
} from '@components'
import { useTheme } from '@constants'
import { useApp } from '@hooks'
import { StackNavigationProps } from '@navigation'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Profile({
  navigation,
}: StackNavigationProps<AccountRoutes, 'Profile'>) {
  const { user } = useApp()
  const { rCard } = useTheme()

  const data = [
    {
      label: 'First Name',
      value: user?.firstName,
    },
    {
      label: 'Last Name',
      value: user?.lastName,
    },
    {
      label: 'Email',
      value: user?.email,
    },
    {
      label: 'PhoneNumber',
      value: user?.phoneNumber,
    },
  ]

  return (
    <RootContainer title='Profile' rightAdornment={<Icon name='edit' />}>
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        ListHeaderComponent={
          <View style={{ alignItems: 'center' }}>
            <Avatar src={user?.photoUrl} />
          </View>
        }
        renderItem={({ item }) => {
          return (
            <>
              <IText variant='bold' size={13}>
                {item.label}:
              </IText>
              <AnimatedPressable style={[styles.item, rCard]}>
                <IText>{item.value}</IText>
              </AnimatedPressable>
            </>
          )
        }}
        ListFooterComponent={
          <>
            <Divider />
            <IButton
              label='Edit Profile'
              onPress={() => navigation.navigate('EditProfile')}
            />
            <Divider />
          </>
        }
      />
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.2,
  },
})
