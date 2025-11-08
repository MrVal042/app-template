import { SIZES } from '@constants'
import { Platform } from 'react-native'

const borderRadius = SIZES.radius
const shadowHeight = 1.5
const margin = 1

export const shadowStyles =
  Platform.OS === 'android'
    ? {
        borderRadius,
        elevation: shadowHeight + 2,
        borderTopWidth: 0.2,
        margin,
      }
    : {
        shadowOffset: { width: 0, height: shadowHeight },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius,
        margin,
      }
