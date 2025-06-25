import { Divider, Icon, IconProps, IText, RootContainer } from '@components'
import { StackNavigationProps } from '@navigation'
import { IColors } from '@contants'
import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated from 'react-native-reanimated'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

export default function Help({
  navigation,
}: StackNavigationProps<AccountRoutes, 'HelpSupport'>) {
  const handlePress = async (url: string) => {
    if (url) {
      try {
        await Linking.openURL(url)
      } catch (error) {
        console.warn('Failed to open URL:', error)
      }
    }
  }

  const data: {
    label: string
    icon: IconProps['name']
    link: string
    color: string
  }[] = [
    {
      icon: 'facebook-f',
      label: 'Facebook - appName',
      link: 'https://facebook.com/appName',
      color: IColors.primary,
    },
    {
      icon: 'instagram',
      color: IColors.dangerDark,
      label: 'Instagram - appName',
      link: 'https://instagram.com/appName',
    },
    {
      icon: 'twitter',
      color: IColors.primaryLight,
      label: 'X/Twitter - appName',
      link: 'https://twitter.com/appName',
    },
    {
      icon: 'whatsapp',
      color: IColors.success,
      label: 'Whatsapp - +129876543210',
      link: 'https://api.whatsapp.com/send?phone=+129876543210',
    },
    {
      icon: 'phone',
      link: 'tel:+2348167302597',
      color: IColors.infoDark,
      label: 'Call - +2348167302597',
    },
  ]

  const HeaderComponent = () => {
    return (
      <View>
        <IText size={15} variant='bold'>
          Need help or have a question?
        </IText>
        <Divider space='xs' />
        <IText textAlign='left' size={12}>
          {`Reach out to us anytime and we'll get back to you as soon as possible.\nWe're here to assist you. `}
        </IText>
        <Divider space='s' />
      </View>
    )
  }

  return (
    <RootContainer title='Help & Support'>
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderComponent}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => {
          return (
            <AnimatedTouchableOpacity
              style={[styles.item, rCard]}
              onPress={() => handlePress(item.link)}
            >
              <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
              >
                <View
                  style={[
                    styles.iconWrap,
                    { backgroundColor: `${item.color}50` },
                  ]}
                >
                  <Icon name={item.icon} color={item.color} />
                </View>
                <IText size={16}>{item.label}</IText>
              </View>
              <Icon name='external-link' />
            </AnimatedTouchableOpacity>
          )
        }}
        ListFooterComponent={
          <AnimatedTouchableOpacity
            style={[styles.item, rCard]}
            onPress={() => navigation.navigate('MailUs')}
          >
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: `${IColors.text}47` },
                ]}
              >
                <Icon name='email' color={IColors.text} />
              </View>
              <IText size={16}>Mail us</IText>
            </View>
            <Icon name='external-link' />
          </AnimatedTouchableOpacity>
        }
      />
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.2,
  },
  toggle: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    height: 40,
    width: 40,
  },
})
