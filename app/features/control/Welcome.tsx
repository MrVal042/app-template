import { Divider, IButton, IText, RootContainer } from '@components'
import { IColors } from '@constants'
import { users } from '@data'
import { useApp } from '@hooks'
import { StackNavigationProps } from '@navigation'
import { Link } from 'expo-router'
import { Linking, Platform, StyleSheet, View } from 'react-native'

export default function Welcome({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Welcome'>) {
  const { login } = useApp()

  const openFileInVSCode = async () => {
    if (__DEV__ && Platform.OS === 'web') {
      await Linking.openURL(
        'vscode://file/full/path/to/app/features/control/Welcome.tsx'
      )
    }
  }

  return (
    <RootContainer title='Welcome screen'>
      <View style={styles.container}>
        <IText>Welcome to React Native Boilerplate by MrVal042</IText>
        <IText>
          This is a{' '}
          <IText variant='bold' size={14}>
            production-ready boilerplate
          </IText>{' '}
          for building scalable React Native apps using:
          <Link
            href='https://expo.dev/'
            style={{ color: IColors.infoDark, textDecorationLine: 'underline' }}
          >
            {'\n'}Expo,
          </Link>
          <Link
            href='https://github.com/pmndrs/zustand'
            style={{ color: IColors.infoDark, textDecorationLine: 'underline' }}
          >
            {'\n'}Zustand,
          </Link>
          <Link
            href='hhttps://reactnavigation.org/'
            style={{ color: IColors.infoDark, textDecorationLine: 'underline' }}
          >
            {'\n'}React Navigation
          </Link>
        </IText>
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
        <IText>
          Go to{' '}
          <IText
            onPress={() => {
              console.log('Open in VSCode: app/features/control/Welcome.tsx')
              openFileInVSCode()
            }}
            style={{ color: IColors.infoDark, textDecorationLine: 'underline' }}
          >
            app/features/control/Welcome.tsx
          </IText>{' '}
          to edit this screen
        </IText>
        <Divider />
        <IButton label='Login' onPress={() => navigation.navigate('Login')} />
        <IButton
          label='Home'
          bgColor={IColors.successDark}
          icon={{ name: 'home', size: 18 }}
          onPress={() => login({ ...users[1] })}
        />
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
