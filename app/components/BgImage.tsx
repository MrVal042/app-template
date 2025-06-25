import { images } from '@assets'
import { height, width } from '@constants'
import { ImageBackground } from 'expo-image'
import React from 'react'
import { StyleSheet } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export default function ImageBg({ children }: IProps) {
  return (
    <ImageBackground
      source={images.logo}
      style={styles.BgImg}
      contentFit='contain'
      imageStyle={{ opacity: 0.2 }}
      blurRadius={10}
      accessibilityLabel='Login Background'
      accessibilityRole='image'
      accessibilityHint='Background image for the login screen'
      accessible={true}
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
