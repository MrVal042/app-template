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

  const RenderLink = (item: { name: string; link: string; size?: number }) => {
    const handleUrl = async (url: string) => {
      const supported = await Linking.canOpenURL(url)
      if (supported) await Linking.openURL(url)
      else console.log("Can't open URL: " + url)
    }
    return (
      <TouchableOpacity onPress={() => handleUrl(item.link)}>
        <IText
          color={IColors.infoDark}
          textTransform='capitalize'
          size={item.size || 14}
          style={{
            marginBottom: -5,
            textDecorationLine: 'underline',
          }}
        >
          {item.name}
        </IText>
      </TouchableOpacity>
    )
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
            <RenderLink key={String(index)} {...item} />
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
        <IText>
          ⭐ Star the project on{' '}
          <RenderLink
            link={'https://github.com/MrVal042/app-template'}
            name='Github'
          />
        </IText>
        <IText>
          Tap <IText variant='bold'>Explore Demo</IText> to log in as a sample
          user.
        </IText>
        <IText>
          ✏️ Edit this screen at{' '}
          <RenderLink
            size={12}
            link='vscode://file/full/path/to/app/features/control/Welcome.tsx'
            name='app/features/control/Welcome.tsx'
          />
        </IText>

        <View style={{ marginTop: 'auto', gap: 20 }}>
          <IButton
            marginBottom={0}
            label='Get Started'
            onPress={() => navigation.navigate('Signup')}
          />

          <IButton
            label='Explore Demo'
            marginBottom={-10}
            bgColor={IColors.successDark}
            icon={{ name: 'home', size: 18 }}
            onPress={() => loginUser({ ...users[1] }, null)}
          />

          <IText textAlign='center' size={13}>
            Made by{' '}
            <IText size={13} variant='bold'>
              MrVal042
            </IText>{' '}
            — follow on{' '}
            <RenderLink
              size={12}
              name='x(Twitter)'
              link='https://x.com/vasogwaze'
            />{' '}
            |{' '}
            <RenderLink
              name='LinkedIn'
              link='https://www.linkedin.com/in/valentine-asogwa-030272212/'
            />
          </IText>
        </View>
      </View>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    flex: 1,
    gap: 20,
  },
  logo: {
    height: 120,
    width: '30%',
    borderWidth: 1,
    borderRadius: 25,
    alignSelf: 'center',
    borderColor: IColors.activeColorDark,
  },
  links: {
    gap: 7,
    marginTop: -10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
})

const links = [
  { name: 'Expo', link: 'https://expo.dev/' },
  { name: 'React Navigation', link: 'https://reactnavigation.org/' },
  {
    name: 'Reanimated',
    link: 'https://docs.expo.dev/versions/latest/sdk/reanimated/',
  },
  { name: 'React Hook Form', link: 'https://react-hook-form.com/' },
  { name: 'Yup Validator', link: 'https://github.com/jquense/yup' },
  { name: 'Vector Icons', link: 'https://icons.expo.fyi/' },
  {
    name: 'Bottom Sheet',
    link: 'https://www.npmjs.com/package/@gorhom/bottom-sheet',
  },
  {
    name: 'Secure Store',
    link: 'https://docs.expo.dev/versions/latest/sdk/securestore/',
  },
  {
    name: 'OTP Entry',
    link: 'https://www.npmjs.com/package/react-native-otp-entry',
  },
  {
    name: 'Datetime Picker',
    link: 'https://www.npmjs.com/package/react-native-modal-datetime-picker',
  },
  { name: 'Zustand', link: 'https://github.com/pmndrs/zustand' },
  { name: 'Dayjs', link: 'https://day.js.org/' },
  { name: 'Axios', link: 'https://axios-http.com/docs/intro' },
  {
    name: 'Async Storage',
    link: 'https://react-native-async-storage.github.io/async-storage/docs/install/',
  },
]
