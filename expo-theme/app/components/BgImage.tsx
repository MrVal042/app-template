import { height, width } from '@constants'
import { ImageBackground } from 'expo-image'
import React from 'react'
import { StyleSheet } from 'react-native'
import { bgImage } from '@data'
import { useTheme } from '@hooks'

type IProps = {
  children: React.ReactNode
  hideBg?: boolean
}

export default function ImageBg({ children, hideBg }: IProps) {
  const { colors, isDarkMode } = useTheme()
  return (
    <ImageBackground
      accessibilityHint='Background image for the auth or form screen'
      style={[styles.BgImg, { backgroundColor: colors.background }]}
      accessibilityLabel='Login Background'
      imageStyle={{ opacity: hideBg ? 0 : isDarkMode ? 0.5 : 0.9 }}
      accessibilityRole='image'
      contentFit='contain'
      accessible={true}
      source={bgImage}
      blurRadius={10}
    >
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  BgImg: {
    width,
    height: height * 0.99,
    paddingHorizontal: 20,
    gap: 20,
    flex: 1,
  },
})
