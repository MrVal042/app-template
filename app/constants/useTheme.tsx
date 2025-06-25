// hooks/useTheme.ts

import { useStore } from '@store'
import { useEffect } from 'react'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { IColors } from './color'

const lightTheme = {
  ...IColors,
  background: '#ffffff',
  text: '#1a1a1a',
  // Add other theme-specific colors here
}

const darkTheme = {
  ...IColors,
  background: '#1a1a1a',
  text: '#ffffff',
  // Add other theme-specific colors here
}

export const duration = 500

export default function useTheme() {
  const { isDarkMode } = useStore()
  const progress = useSharedValue(isDarkMode ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isDarkMode ? 1 : 0, {
      duration,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode])

  const rBackground = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [lightTheme.background, darkTheme.background]
    ),
  }))
  const rColor = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [lightTheme.text, darkTheme.text]
    ),
  }))
  const rBorderColor = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [IColors.grey[300], IColors.grey[700]]
    ),
  }))
  const rCard = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [IColors.grey[200], IColors.grey[900]]
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [IColors.grey[300], IColors.grey[800]]
    ),
  }))

  const staticColors = isDarkMode ? darkTheme : lightTheme

  return {
    isDarkMode,
    colors: staticColors,
    rBackground,
    rColor,
    rBorderColor,
    rCard,
  }
}
