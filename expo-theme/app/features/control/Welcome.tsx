import { IButton, IText, RootContainer } from '@components'
import { IColors } from '@constants'
import { bgImage, users } from '@data'
import { StackNavigationProps } from '@navigation'
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { useAuth } from '@store'

export default function Welcome({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Welcome'>) {
  const { loginUser } = useAuth()

  const handleUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url)
    if (supported) await Linking.openURL(url)
    else console.log("Can't open URL: " + url)
  }

  return (
    <RootContainer title='Welcome screen' scroll>
      <View style={styles.container}>
        <Image source={bgImage} style={styles.logo} resizeMode='contain' />

        <IText variant='title' size={20} textAlign='center'>
          This is React Native Boilerplate
        </IText>

        <IText textAlign='justify'>
          Kickstart your next <IText variant='bold'>production-grade app</IText>{' '}
          with a <IText variant='bold'>ready-to-scale foundation</IText> built
          on Expo, TypeScript, and modern architecture. Designed for developers
          who value clarity, structure, and speed.
        </IText>

        <IText variant='title' size={18}>
          ⚙️ Built with:
        </IText>

        <View style={styles.links}>
          {links.map((item, index) => (
            <TouchableOpacity
              key={String(index)}
              onPress={() => handleUrl(item.link)}
            >
              <IText
                textTransform='capitalize'
                color={IColors.infoDark}
                style={styles.link}
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
          {'\n'}- Secure async storage
          {'\n'}- Global error handler
          {'\n'}- Axios API integration
          {'\n'}- TypeScript strict mode
          {'\n'}- React Hook Form + Yup
          {'\n'}- Expo Push Notifications
          {'\n'}- Navigation (Stack & Tabs)
          {'\n'}- Testing setup (unit & e2e)
          {'\n'}- Light & Dark theme support
          {'\n'}- Environment variables (.env)
          {'\n'}- Reusable custom components
          {'\n'}- Zustand global state management
          {'\n'}- Integrated App Monitoring (Sentry)
        </IText>
        <TouchableOpacity
          onPress={() => handleUrl('https://github.com/MrVal042/app-template')}
        >
          <IText>
            ⭐ Star the project on{' '}
            <IText color={IColors.infoDark} style={styles.link}>
              GitHub
            </IText>
          </IText>
        </TouchableOpacity>

        <IText size={12}>
          Tap <IText variant='bold'>Explore Demo</IText> to log in as a sample
          user.
        </IText>
        <TouchableOpacity
          onPress={() =>
            handleUrl(
              'vscode://file/full/path/to/app/features/control/Welcome.tsx'
            )
          }
        >
          <IText textAlign='center'>
            ✏️ Edit this screen at{' '}
            <IText color={IColors.infoDark} style={styles.link}>
              app/features/control/Welcome.tsx
            </IText>
          </IText>
        </TouchableOpacity>

        <View style={{ marginTop: 'auto', gap: 20 }}>
          <IButton
            marginBottom={0}
            label='Get Started'
            onPress={() => navigation.navigate('Signup')}
          />

          <IButton
            label='Explore Demo'
            bgColor={IColors.successDark}
            icon={{ name: 'home', size: 18 }}
            marginBottom={-10}
            onPress={() => loginUser({ ...users[1] }, null)}
          />

          <TouchableOpacity onPress={() => handleUrl('https://x.com/MrVal042')}>
            <IText textAlign='center' size={12}>
              Made by <IText variant='bold'>MrVal042</IText> — follow on{' '}
              <IText color={IColors.infoDark} style={styles.link}>
                X (Twitter)
              </IText>
            </IText>
          </TouchableOpacity>
        </View>
      </View>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    marginTop: 10,
    width: '100%',
  },
  logo: {
    height: 90,
    width: '50%',
    borderWidth: 1,
    borderRadius: 99,
    alignSelf: 'center',
    borderColor: IColors.activeColorDark,
  },
  links: {
    gap: 7,
    marginTop: -10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  link: {
    color: IColors.infoDark,
    textDecorationLine: 'underline',
  },
})

const links = [
  { label: 'Expo', link: 'https://expo.dev/' },
  {
    label: 'Reanimated',
    link: 'https://docs.expo.dev/versions/latest/sdk/reanimated/',
  },
  { label: 'React Hook Form', link: 'https://react-hook-form.com/' },
  { label: 'Yup Validator', link: 'https://github.com/jquense/yup' },
  { label: 'Dayjs', link: 'https://day.js.org/' },
  { label: 'Vector Icons', link: 'https://icons.expo.fyi/' },
  {
    label: 'Bottom Sheet',
    link: 'https://www.npmjs.com/package/@gorhom/bottom-sheet',
  },
  { label: 'Axios', link: 'https://axios-http.com/docs/intro' },
  {
    label: 'Datetime Picker',
    link: 'https://www.npmjs.com/package/react-native-modal-datetime-picker',
  },
  {
    label: 'OTP Entry',
    link: 'https://www.npmjs.com/package/react-native-otp-entry',
  },
  {
    label: 'Secure Store',
    link: 'https://docs.expo.dev/versions/latest/sdk/securestore/',
  },
  {
    label: 'Async Storage',
    link: 'https://react-native-async-storage.github.io/async-storage/docs/install/',
  },
  { label: 'Zustand', link: 'https://github.com/pmndrs/zustand' },
  { label: 'React Navigation', link: 'https://reactnavigation.org/' },
]
