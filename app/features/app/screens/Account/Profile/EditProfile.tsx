import {
  Avatar,
  Divider,
  FormField,
  IButton,
  Icon,
  RootContainer,
} from '@components'
import { IColors, width } from '@constants'
import { useApp } from '@hooks'
import { StackNavigationProps } from '@navigation'
import { useForm } from 'react-hook-form'
import { FlatList, TouchableOpacity, View } from 'react-native'

const defaultValues = {
  bio: '',
  displayName: '',
  phoneNumber: '',
}

type FormData = {
  name: keyof typeof defaultValues
  label: string
  value?: string
}
export default function EditProfile({
  navigation,
}: StackNavigationProps<AccountRoutes, 'EditProfile'>) {
  const { user } = useApp()
  const { control, handleSubmit } = useForm({
    defaultValues,
  })

  const onSubmit = (data: any) => {
    console.log({ data })
  }

  const data: FormData[] = [
    {
      label: 'Bio',
      value: user?.bio,
      name: 'bio',
    },
    {
      label: 'Display Name',
      value: `${user?.firstName} ${user?.lastName}`,
      name: 'displayName',
    },
    {
      label: 'PhoneNumber',
      value: user?.phoneNumber,
      name: 'phoneNumber',
    },
  ]
  const handleChangeImg = () => {}

  return (
    <RootContainer title='Edit Profile'>
      <FlatList
        data={data}
        style={{ width: '100%' }}
        ListHeaderComponent={
          <TouchableOpacity
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              width: '55%',
            }}
            activeOpacity={0.7}
            onPress={handleChangeImg}
          >
            <Avatar size={width * 0.5} src={user?.photoUrl} />
            <View style={{ position: 'absolute', right: 15, bottom: 10 }}>
              <Icon
                name='add-photo-alternate'
                color={IColors.primary}
                size={35}
              />
            </View>
            <Divider space='xs' />
          </TouchableOpacity>
        }
        contentContainerStyle={{ gap: 0 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => {
          const multiline = item.label.toLowerCase() === 'bio'
          return (
            <FormField
              type='input'
              name={item.name}
              control={control}
              label={item.label}
              value={item.value}
              multiline={multiline}
              defaultValue={item.value}
            />
          )
        }}
      />
      <View style={{ marginTop: 'auto', width: '100%' }}>
        <Divider />
        <IButton label='Update' onPress={handleSubmit(onSubmit)} />
        <Divider space='l' />
      </View>
    </RootContainer>
  )
}
