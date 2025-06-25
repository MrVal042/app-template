import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import { BgImage, Divider, FormField, IButton, IText } from '@components'
import { IColors } from '@constants'
import { users } from '@data'
import { useApp } from '@hooks'
import { StackNavigationProps } from '@navigation'
import { ActionNote, AuthContainer } from '../components'
import { loginData, loginForm, loginValues } from '../data'

export default function Login({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Login'>) {
  const { login } = useApp()
  const inputRefs = useRef<(TextInput | null)[]>([])
  const { control, handleSubmit } = useForm({
    defaultValues: loginValues,
  })

  const onSubmit = (data: any) => {
    console.log(`Logging in ${data}`)
    login({ ...users[0] })
  }

  const loginLength = loginData.length - 1

  return (
    <AuthContainer hideGoBack>
      <BgImage>
        <Divider space='s' />
        <View style={{ alignItems: 'flex-start', width: '100%' }}>
          <IText variant='bold' size={30} textAlign='left'>
            Welcome Back
          </IText>
          <IText>We are glad to have you here!</IText>
        </View>
        <Divider />
        <View>
          {loginData.map((item, index) => {
            return (
              <FormField<loginForm>
                type='input'
                key={item.name}
                name={item.name}
                control={control}
                label={item.label}
                autoFocus={index === 0}
                placeholder={item.placeholder}
                keyboardType={item.keyboardType}
                secureTextEntry={item.secureTextEntry}
                returnKeyType={index < loginLength ? 'next' : 'done'}
                returnKeyLabel={index < loginLength ? 'Next' : 'Done'}
                inputRef={(ref: TextInput | null) => {
                  inputRefs.current[index] = ref
                }}
                rules={{
                  required: `${item.label} is required`,
                }}
                onSubmitEditing={() => {
                  if (index < loginLength) {
                    inputRefs.current[index + 1]?.focus()
                  } else {
                    handleSubmit(onSubmit)()
                  }
                }}
              />
            )
          })}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <IText variant='bold' color={IColors.primaryDark}>
              Forgot password
            </IText>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <IButton label='Login' onPress={handleSubmit(onSubmit)} />
          <ActionNote
            actionText='Signup'
            label="Don't have account?"
            onPress={() => navigation.navigate('Signup')}
          />
          <Divider />
        </View>
      </BgImage>
    </AuthContainer>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
})
