import { useTheme } from '@constants'
import { StyleSheet, ViewProps } from 'react-native'
import Animated from 'react-native-reanimated'

export default function ThemeView({ style, ...props }: ViewProps) {
  const { rBackground } = useTheme()

  return (
    <Animated.View {...props} style={[styles.container, rBackground, style]} />
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
  },
})
