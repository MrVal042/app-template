import {
  BgImage,
  Divider,
  IButton,
  Icon,
  IText,
  OtpField,
  RootContainer,
} from '@components'
import { IColors } from '@constants'
import { useApp } from '@hooks'
import { StackNavigationProps } from '@navigation'
import { useCallback, useState } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ActionNote } from '../components'

const duration = 500

export default function VerifyClaim({
  route,
  navigation,
}: StackNavigationProps<AuthRoutes, 'VerifyClaim'>) {
  const { isDarkMode, colors } = useApp()
  const [showInfo, setShowInfo] = useState(false)
  const { email } = route.params
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(-10)

  const infoAnimationStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
    backgroundColor: `${colors.background}99`,
  }))

  const handleShowInfo = useCallback(() => {
    if (showInfo) {
      // Animate out
      opacity.value = withTiming(0, {
        duration: duration / 2,
        easing: Easing.out(Easing.ease),
      })
      translateY.value = withTiming(-10, {
        duration,
        easing: Easing.out(Easing.ease),
      })
      setTimeout(() => setShowInfo(false), duration) // Wait for animation to complete
    } else {
      // Animate in
      setShowInfo(true)
      opacity.value = withTiming(1, {
        duration,
        easing: Easing.out(Easing.ease),
      })
      translateY.value = withTiming(0, {
        duration,
        easing: Easing.out(Easing.ease),
      })
      setTimeout(() => {
        opacity.value = withTiming(0, { duration: duration / 2 })
        translateY.value = withTiming(-10, { duration: duration / 2 })
        setTimeout(() => setShowInfo(false), duration / 2)
      }, 3000)
    }
  }, [showInfo, opacity, translateY])

  const RenderInfo = () => {
    return (
      <Animated.View style={[styles.infoWrap, infoAnimationStyle]}>
        <View
          style={[
            styles.info,
            {
              backgroundColor: colors.background,
              borderColor: colors.grey[isDarkMode ? 600 : 400],
            },
          ]}
        >
          <IText textAlign='left'>
            If you did not receive the code, please check your spam folder or
            request a new code.
          </IText>
        </View>
      </Animated.View>
    )
  }

  return (
    <RootContainer title='Verification'>
      <BgImage>
        <Pressable
          style={styles.container}
          onPress={() => showInfo && handleShowInfo()}
        >
          <View style={styles.flexRow}>
            <IText variant='bold' size={20} textAlign='left'>
              Email Verification
            </IText>
            <TouchableOpacity onPress={handleShowInfo}>
              <Icon
                name='info'
                size={20}
                color={IColors.grey[isDarkMode ? 500 : 400]}
              />
            </TouchableOpacity>
            {showInfo && <RenderInfo />}
          </View>
          <IText>
            We have sent a verification code to your email
            {email ? ` ${email}.` : '.'} {'\n'}Please enter it below to verify
            your account.
            <Divider space='s' horizontal />
          </IText>
          <Divider />
          <IText size={16}>Enter verification code</IText>
          <OtpField onFilled={(text) => console.log(`OTP is ${text}`)} />
          <Divider space='s' />
          <ActionNote
            label="Didn't receive the code?"
            actionText='Resend Code'
            onPress={() => console.log('Resend code')}
          />

          <View style={styles.footer}>
            <IButton
              label='Verify'
              onPress={() => navigation.navigate('Login')}
            />
            <Divider space='l' />
          </View>
        </Pressable>
      </BgImage>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  container: {
    gap: 10,
    flex: 1,
  },
  info: {
    flex: 1,
    width: '50%',
    alignSelf: 'flex-end',
    zIndex: 1000,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderTopLeftRadius: 0,
  },
  footer: {
    marginTop: 'auto',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  infoWrap: {
    position: 'absolute',
    width: '100%',
    top: 25,
    zIndex: 1,
  },
})
