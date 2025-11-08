import { Divider, IButton, IText, RootContainer } from '@components'
import { IColors } from '@constants'
import { users } from '@data'
import { StackNavigationProps } from '@navigation'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useAuth } from '@store'

export default function Welcome({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Welcome'>) {
  const { loginUser } = useAuth()

  const handleUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      console.log("Don't know how to open URI: " + url)
    }
  }

  return (
    <RootContainer title='Welcome screen'>
      <View style={styles.container}>
        <IText variant='title' size={18} textAlign='center'>
          Welcome to React Native Boilerplate by MrVal042
        </IText>
        <IText>
          This is a{' '}
          <IText variant='bold' size={14}>
            production-ready boilerplate
          </IText>{' '}
          for building scalable React Native apps using:
        </IText>
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          {links.map((item, index) => (
            <TouchableOpacity
              key={String(index)}
              onPress={() => handleUrl(item.link)}
            >
              <IText
                textTransform='capitalize'
                color={IColors.infoDark}
                style={{
                  color: IColors.infoDark,
                  textDecorationLine: 'underline',
                }}
              >
                {item.label}
              </IText>
            </TouchableOpacity>
          ))}
        </View>
        <IText>
          <IText variant='bold' size={20}>
            🚀 Features:
          </IText>
          {'\n'}- Modular architecture
          {'\n'}- Secure & async store
          {'\n'}- Global error handler
          {'\n'}- TypeScript strict mode
          {'\n'}- Organized folder structure
          {'\n'}- Environment variable support
          {'\n'}- Custom hooks for logic isolation
          {'\n'}- Zustand for global state management
          {'\n'}- Axios configured for faster integration
          {'\n'}- unit, component and end2end Testing setup
          {'\n'}- App Analysis and Sentry to track standalone app
        </IText>
        <TouchableOpacity
          onPress={() => {
            console.log('Open in VSCode: app/features/control/Welcome.tsx')
            handleUrl(
              'vscode://file/full/path/to/app/features/control/Welcome.tsx'
            )
          }}
        >
          <IText>
            Go to{' '}
            <IText
              color={IColors.infoDark}
              style={{
                color: IColors.infoDark,
                textDecorationLine: 'underline',
              }}
            >
              app/features/control/Welcome.tsx
            </IText>{' '}
            to edit this screen
          </IText>
        </TouchableOpacity>
        <View style={{ marginTop: 'auto', gap: 20 }}>
          <IButton label='Login' onPress={() => navigation.navigate('Login')} />
          <IButton
            label='Home'
            bgColor={IColors.successDark}
            icon={{ name: 'home', size: 18 }}
            onPress={() => loginUser({ ...users[1] }, null)}
          />
          <Divider space='l' />
        </View>
      </View>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    width: '100%',
  },
})

const links = [
  { label: 'expo', link: 'https://expo.dev/' },
  { label: 'animation', link: 'https://expo.dev/' },
  { label: 'React hook form', link: 'https://expo.dev/' },
  { label: 'Yup validator', link: 'https://expo.dev/' },
  {
    label: 'dayjs',
    link: 'https://expo.dev/',
  },
  {
    label: 'vector-icons',
    link: 'https://icons.expo.fyi/Index',
  },
  {
    label: 'bottom-sheet',
    link: 'https://www.npmjs.com/package/@gorhom/bottom-sheet',
  },
  { label: 'axios', link: 'https://axios-http.com/docs/intro' },
  {
    label: 'datetime-picker',
    link: 'https://www.npmjs.com/package/react-native-modal-datetime-picker',
  },
  {
    label: 'otp-entry',
    link: 'https://www.npmjs.com/package/react-native-otp-entry',
  },
  {
    label: 'secure-store',
    link: 'https://docs.expo.dev/versions/latest/sdk/securestore/',
  },
  {
    label: 'async-storage',
    link: 'https://react-native-async-storage.github.io/async-storage/docs/install/',
  },
  { label: 'Zustand', link: 'https://github.com/pmndrs/zustand' },
  {
    label: 'React Navigation',
    link: 'https://reactnavigation.org/',
  },
]
