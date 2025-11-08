import { IButton, IText, RootContainer } from '@components'
import { StackNavigationProps } from '@navigation'
import { StyleSheet, View } from 'react-native'
import { uStyles } from '@styles'
import { useState } from 'react'
import { Image } from 'expo-image'
import { bgImage } from '@data'
import { width } from '@constants'

export default function Onboard({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Onboard'>) {
  const [next, setNext] = useState(0)
  const label = [
    'Onboard Screen',
    'Enjoy Classic',
    'Readable & Scalable',
    'Production Ready',
  ]
  return (
    <RootContainer>
      <View style={stylex.container}>
        <Image source={bgImage} style={stylex.img} />
        <IText textAlign='center' variant='bold' size={22}>
          {label[next]}
        </IText>
      </View>
      <View style={[uStyles.footer, uStyles.flexBtw]}>
        <IButton
          width={'40%'}
          label={next === 0 ? 'Skip' : 'Prev'}
          variant={next === 0 ? 'outline' : 'primary'}
          onPress={() => {
            next > 0
              ? setNext((prev) => prev - 1)
              : navigation.replace('Welcome')
          }}
        />
        <IButton
          label='Next'
          width={'40%'}
          onPress={() => {
            next < 3
              ? setNext((prev) => prev + 1)
              : navigation.replace('Welcome')
          }}
          icon={{ name: 'arrow-circle-right', alignIcon: 'right' }}
        />
      </View>
    </RootContainer>
  )
}

const ImgSize = width * 0.7
const stylex = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  img: {
    width: ImgSize,
    height: ImgSize,
    borderRadius: ImgSize,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'dodgerblue',
  },
})
