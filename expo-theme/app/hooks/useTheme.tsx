// hooks/useTheme.ts

import { IColors } from '@constants'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useAppStore } from '@store'
import { useEffect } from 'react'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const lightTheme = {
  ...IColors,
  ...DefaultTheme,
  text: '#000000',
  cardDark: '#f8f8f8',
  disabled: '#BDBDBD',
  background: '#ffffff',
  button: IColors.primary,
  inputColor: '#c6c6c6ff',
  activeColor: IColors.primary,
  backgroundLight: '#f9ece8',
  inputBorderColor: IColors.primary,
  skeletal: ['#dbd7d6', '#ffffff', '#dbd7d6'],
  // Add other theme-specific colors here
}

const darkTheme = {
  ...IColors,
  ...DarkTheme,
  text: '#ffffff',
  background: '#1a1a1a',
  cardDark: IColors.grey[800],
  disabled: IColors.grey[900],
  backgroundLight: '#1b1b1b',
  inputColor: IColors.grey[800],
  button: IColors.activeColorDark,
  activeColor: IColors.activeColorDark,
  inputBorderColor: IColors.activeColorDark,
  skeletal: ['#464242', '#616161', '#464242'],
  // Add other theme-specific colors here
}

export const duration = 500

export default function useTheme() {
  const { isDarkMode } = useAppStore()
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
      [lightTheme.cardDark, darkTheme.cardDark]
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
