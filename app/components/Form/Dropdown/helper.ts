import { Dimensions } from 'react-native'
const { height } = Dimensions.get('window')
const DROPDOWN_MAX_HEIGHT = height * 0.4

export const calculateDropdownHeight = ({
  dropdownHeight,
  itemHeight,
  dataLength,
}: {
  dropdownHeight: number
  itemHeight: number
  dataLength: number
}) => {
  if (dropdownHeight) {
    return dropdownHeight
  } else {
    if (dataLength === 0) {
      return 150
    } else {
      const count = dataLength

      if (itemHeight) {
        const rowStyleHeight = itemHeight * count

        return rowStyleHeight < DROPDOWN_MAX_HEIGHT
          ? rowStyleHeight
          : DROPDOWN_MAX_HEIGHT
      } else {
        const rowStyleHeight = 50 * count

        return rowStyleHeight < DROPDOWN_MAX_HEIGHT
          ? rowStyleHeight
          : DROPDOWN_MAX_HEIGHT
      }
    }
  }
}

export const findIndexInArr = (value: string | undefined, arr: string[]) => {
  const defaultValueIndex = arr.findIndex((list) => list === value)

  return defaultValueIndex
}

export const isExist = (value?: string) => Boolean(value)
