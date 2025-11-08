import {
  BgImage,
  Divider,
  FormField,
  IButton,
  RootContainer,
} from '@components'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'

const defaultValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
}

type FormValues = typeof defaultValues

type FormData = {
  name: keyof FormValues
  label: string
  placeholder?: string
}
export default function ChangePassword() {
  const inputRefs = useRef<(TextInput | null)[]>([])
  const { control, handleSubmit, watch } = useForm({
    defaultValues,
  })

  const onSubmit = (data: any) => {
    console.log(`Change Password ${data}`)
  }
  const pwdLength = passwordData.length - 1

  return (
    <RootContainer title='Change Password'>
      <BgImage>
        <View>
          {passwordData.map((item, index) => {
            return (
              <FormField<FormValues>
                type='input'
                key={item.name}
                secureTextEntry
                name={item.name}
                control={control}
                label={item.label}
                autoFocus={index === 0}
                placeholder={item.placeholder}
                returnKeyType={index < pwdLength ? 'next' : 'done'}
                returnKeyLabel={index < pwdLength ? 'Next' : 'Done'}
                inputRef={(ref: TextInput | null) => {
                  inputRefs.current[index] = ref
                }}
                rules={{
                  required: `${item.label} is required`,
                  ...(item.name === 'confirmPassword' && {
                    validate: (value) => {
                      const newPassword = watch('newPassword')
                      return value === newPassword || 'Passwords do not match'
                    },
                  }),
                }}
                onSubmitEditing={() => {
                  if (index < pwdLength) {
                    inputRefs.current[index + 1]?.focus()
                  } else {
                    handleSubmit(onSubmit)()
                  }
                }}
              />
            )
          })}
        </View>
        <View style={styles.footer}>
          <IButton label='Continue' onPress={handleSubmit(onSubmit)} />
          <Divider space='l' />
        </View>
      </BgImage>
    </RootContainer>
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

export const passwordData: FormData[] = [
  {
    label: 'Old Password',
    name: 'password',
    placeholder: 'Enter old password',
  },
  {
    label: 'New Password',
    name: 'newPassword',
    placeholder: 'Enter new password',
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: 'Confirm password',
  },
]
