import { scale } from '@constants'
import { useApp } from '@hooks'
import { DimensionValue, View } from 'react-native'

type IProps = {
  height?: DimensionValue
  width?: DimensionValue
  margin?: number
}

export default function Skeletal({
  height = 10,
  width = '99%',
  margin = 5,
}: IProps) {
  const { colors, isDarkMode } = useApp()
  return (
    <View
      style={{
        backgroundColor: colors.grey[isDarkMode ? 800 : 200],
        borderRadius: scale(3),
        height,
        margin,
        width,
      }}
    />
  )
}
