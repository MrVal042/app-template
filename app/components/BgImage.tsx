import { height, width } from '@constants'
import { images } from 'assets'
import { ImageBackground } from 'expo-image'
import React from 'react'
import { StyleSheet } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export default function ImageBg({ children }: IProps) {
  return (
    <ImageBackground
      accessibilityHint='Background image for the auth or form screen'
      accessibilityLabel='Login Background'
      imageStyle={{ opacity: 0.2 }}
      accessibilityRole='image'
      contentFit='contain'
      style={styles.BgImg}
      source={images.logo}
      accessible={true}
      blurRadius={10}
    >
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  BgImg: {
    width,
    height: height * 0.7,
    paddingHorizontal: 20,
    gap: 20,
    flex: 1,
  },
})
