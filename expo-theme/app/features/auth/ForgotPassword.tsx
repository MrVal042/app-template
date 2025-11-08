import { Divider, FormField, IButton, IText } from '@components'
import { StyleSheet, View } from 'react-native'
import { AuthContainer } from './components'

import { StackNavigationProps } from '@navigation'
import { useForm } from 'react-hook-form'

export default function ForgotPassword({
  navigation,
}: StackNavigationProps<AuthRoutes, 'ForgotPassword'>) {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: '' },
  })

  const onSubmit = (data: any) => {
    console.log(`Change Password ${data}`)
    navigation.navigate('VerifyClaim', { email: data })
  }
  return (
    <AuthContainer>
      <IText variant='bold' textAlign='left' size={22}>
        Forgot Password
      </IText>
      <IText>
        {`Enter the email associated with your account and we'll send an email
          with instructions to reset your password.`}
      </IText>

      <FormField
        name='email'
        type='input'
        label='email'
        autoFocus={true}
        control={control}
        autoComplete='email'
        placeholder='Email Address'
      />
      <Divider space='m' />
      <View style={styles.footer}>
        <IButton label='Send Instructions' onPress={handleSubmit(onSubmit)} />
        <Divider space='l' />
      </View>
    </AuthContainer>
  )
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
})
