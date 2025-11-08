import {
  Avatar,
  Divider,
  IButton,
  Icon,
  IText,
  RootContainer,
} from '@components'
import { useTheme } from '@hooks'
import { StackNavigationProps } from '@navigation'
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { useAuth } from '@store'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Profile({
  navigation,
}: StackNavigationProps<AccountRoutes, 'Profile'>) {
  const { user } = useAuth()
  const { rCard } = useTheme()

  const data = [
    {
      label: 'First Name',
      value: user?.first_name,
    },
    {
      label: 'Last Name',
      value: user?.last_name,
    },
    {
      label: 'Email',
      value: user?.email,
    },
    {
      label: 'PhoneNumber',
      value: user?.phone_number,
    },
  ]

  return (
    <RootContainer
      title='Profile'
      rightAdornment={
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Icon name='edit' />
        </TouchableOpacity>
      }
    >
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 20 }}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        ListHeaderComponent={
          <View style={{ alignItems: 'center' }}>
            <Avatar src={user?.avatar_url} />
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View style={{ gap: 5 }}>
              <IText variant='bold' size={13}>
                {item.label}:
              </IText>
              <AnimatedPressable style={[styles.item, rCard]}>
                <IText>{item.value}</IText>
              </AnimatedPressable>
            </View>
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
    padding: 15,
    borderRadius: 6,
    borderWidth: 0.2,
  },
})
