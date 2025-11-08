import { IColors } from '@constants'
import { useApp } from '@hooks'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { IView } from './Element'
import { dummyAvatar } from '@data'

type AvatarProps = {
  src?: string
  size?: number
  alt?: string
}

const blurHash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export default function Avatar({ alt, src, size = 100 }: AvatarProps) {
  const { isDarkMode } = useApp()
  const height = size
  const width = size
  const borderRadius = size / 2
  return (
    <IView
      style={[
        styles.imgWrap,
        {
          borderRadius,
          height,
          width,
          backgroundColor: IColors.grey[isDarkMode ? 600 : 300],
        },
      ]}
    >
      <Image
        alt={alt}
        transition={1000}
        contentFit='cover'
        placeholder={blurHash}
        style={[styles.img, { borderRadius }]}
        source={{ uri: src || dummyAvatar }}
      />
    </IView>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    borderColor: IColors.grey[500],
    borderWidth: 0.3,
  },
  img: {
    height: '100%',
    width: '100%',
  },
})
