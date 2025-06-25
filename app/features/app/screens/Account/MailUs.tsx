import { Divider, FormField, IButton, IText, RootContainer } from '@components'
import { useApp } from '@hooks'
import { FieldValues, useForm } from 'react-hook-form'
import { View } from 'react-native'

export default function MailUs() {
  const { user } = useApp()
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: user?.email || '',
      subject: '',
      message: '',
    } as FieldValues,
  })

  const onSubmit = (value: FieldValues) => {
    console.log({ value })
  }

  return (
    <RootContainer title='Mail Us'>
      <View>
        <IText size={15} variant='bold'>
          Prefer to reach us by email?
        </IText>
        <Divider space='xs' />
        <IText textAlign='left' size={12}>
          Send us a message and our team will respond promptly to assist you.
        </IText>
        <Divider space='s' />
      </View>
      <FormField
        name='email'
        label='Email'
        control={control}
        placeholder='Enter your email'
        type='input'
        marginBottom={10}
      />
      <FormField
        type='picker'
        name='subject'
        label='Subject'
        control={control}
        marginBottom={5}
        placeholder='Enter your subject'
        items={[{ label: 'Issue', value: 'issue' }]}
      />
      <FormField
        multiline
        type='input'
        name='message'
        label='Message'
        control={control}
        numberOfLines={5}
        placeholder='Enter your message'
      />
      <IButton
        label='Submit'
        disabled={!formState.isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </RootContainer>
  )
}
