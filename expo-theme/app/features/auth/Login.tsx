import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import { Divider, FormField, IButton, IText, login_schema } from '@components'
import { IColors } from '@constants'
import { loginData, loginValues, users } from '@data'
import { StackNavigationProps } from '@navigation'
import { ActionNote, AuthContainer } from './components'
import { useAuth } from '@store'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Login({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Login'>) {
  const { loginUser, toggleState } = useAuth()
  const inputRefs = useRef<(TextInput | null)[]>([])
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(login_schema),
    defaultValues: loginValues,
  })

  const onSubmit = (data: any) => {
    console.log(`Logging in ${data}`)
    loginUser({ ...users[0] }, null)
    toggleState('isRegistered', true)
  }

  const loginLength = loginData.length - 1

  return (
    <AuthContainer hideGoBack>
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
            <FormField
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
        <IButton
          label='Login'
          disabled={!formState.isValid}
          onPress={handleSubmit(onSubmit)}
        />
        <ActionNote
          actionText='Signup'
          label="Don't have account?"
          onPress={() => navigation.navigate('Signup')}
        />
        <Divider />
      </View>
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
