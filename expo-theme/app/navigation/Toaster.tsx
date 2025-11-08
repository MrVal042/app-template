import { Icon, IconProps, IText, shadowStyles } from '@components'
import { scale } from '@constants'
import { useTheme } from '@hooks'
import { useAppStore } from '@store'
import { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Toaster() {
  const { top } = useSafeAreaInsets()
  const { toaster, setToast } = useAppStore()
  const { colors, isDarkMode } = useTheme()

  const translateY = useSharedValue(-100)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (!toaster?.message) return
    translateY.value = withTiming(top, { duration: 300 })
    opacity.value = withTiming(1, { duration: 300 })
    const timeout = setTimeout(() => {
      translateY.value = withTiming(-100, { duration: 300 })
      opacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) runOnJS(setToast)(null)
      })
    }, 3000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toaster?.type, toaster?.message])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }))

  if (!toaster?.message) return null

  const { color, name } = (() => {
    switch (toaster?.type) {
      case 'error':
        return { color: colors.dangerDark, name: 'error-outline' }
      case 'info':
        return { color: colors.infoDark, name: 'info-outline' }
      case 'warning':
        return { color: colors.warningDark, name: 'warning-outline' }
      default:
        return { color: colors.successDark, name: 'check-circle' }
    }
  })()

  return (
    <Animated.View
      style={[
        styles.container,
        shadowStyles,
        animatedStyle,
        {
          backgroundColor: colors.background,
          shadowColor: isDarkMode ? colors.white : colors.black,
        },
      ]}
    >
      <Icon name={name as IconProps['name']} color={color} />
      <View style={styles.infoWrap}>
        <IText variant='bold' size={14}>
          {toaster.title || toaster.type}
        </IText>

        <IText size={11} numberOfLines={1}>
          {toaster.message || 'Something went wrong!'}
        </IText>
      </View>
      <TouchableOpacity
        onPress={() => {
          translateY.value = withTiming(-100, { duration: 300 })
          opacity.value = withTiming(0, { duration: 300 }, (finished) => {
            if (finished) runOnJS(setToast)(null)
          })
        }}
      >
        <Icon name='close-circle-outline' color={colors.text} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: scale(15),
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    padding: scale(10),
    width: '95%',
    gap: 16,
    zIndex: 999,
  },
  infoWrap: {
    width: '80%',
  },
})
