import { Divider, FormField, IButton, IText, signup_schema } from '@components'
import { StackNavigationProps } from '@navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import { ActionNote, AuthContainer } from './components'
import { signupData, signupValues } from '@data'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Signup({
  route,
  navigation,
}: StackNavigationProps<AuthRoutes, 'Signup'>) {
  const inputRefs = useRef<(TextInput | null)[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(signup_schema),
    defaultValues: signupValues,
  })

  const onSubmit = (data: any) => {
    setIsLoading(true)
    console.log(`Logging in  ${data} `)
    setTimeout(() => {
      navigation.navigate('VerifyClaim', {
        ...data,
      })
    }, 3000)
  }

  const signupLength = signupData.length - 1

  return (
    <AuthContainer hideGoBack>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <IText variant='bold' size={30} textAlign='left'>
          Welcome
        </IText>
        <IText>We are glad to have you here!</IText>
      </View>
      <FlatList
        data={signupData}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <FormField
            type='input'
            name={item.name}
            control={control}
            label={item.label}
            autoFocus={index === 0}
            placeholder={item.placeholder}
            keyboardType={item.keyboardType}
            secureTextEntry={item.secureTextEntry}
            returnKeyType={index < signupLength ? 'next' : 'done'}
            returnKeyLabel={index < signupLength ? 'Next' : 'Done'}
            inputRef={(ref: TextInput | null) => {
              inputRefs.current[index] = ref
            }}
            onSubmitEditing={() => {
              if (index < signupLength) {
                inputRefs.current[index + 1]?.focus()
              } else {
                handleSubmit(onSubmit)()
              }
            }}
          />
        )}
      />

      <View style={styles.footer}>
        <IButton
          label='Signup'
          isLoading={isLoading}
          disabled={!formState.isValid}
          onPress={handleSubmit(onSubmit)}
        />
        <ActionNote
          actionText='Login'
          label='Already have account?'
          onPress={() => navigation.navigate('Login')}
        />
        <Divider space='xxs' />
        <ActionNote
          actionText='terms and conditions.'
          label='By creating continue, you are agreeing to our'
          onPress={() => console.log('Terms and conditions pressed')}
        />
        <Divider space='xxs' />
      </View>
    </AuthContainer>
  )
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
})
