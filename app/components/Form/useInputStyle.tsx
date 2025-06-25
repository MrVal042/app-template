import { input, scale, useTheme } from '@constants'
import { Path, RegisterOptions } from 'react-hook-form'
import { StyleSheet } from 'react-native'

export type IRules<T extends Record<string, any>> = Omit<
  RegisterOptions<T, Path<T>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>
export default function useInputStyle() {
  const { colors, isDarkMode } = useTheme()

  const inputStyles = StyleSheet.create({
    container: {
      marginBottom: input.marginBottom,
      width: '97%',
      alignSelf: 'center',
    },
    inputWrap: {
      backgroundColor: colors.grey[isDarkMode ? 700 : 300],
      borderBottomColor: colors.primary,
      paddingHorizontal: input.padding,
      borderRadius: input.borderRadius,
      justifyContent: 'space-between',
      borderBottomWidth: scale(2.5),
      minHeight: input.height,
      alignItems: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      marginTop: 5,
    },
    input: {
      flex: 1,
      height: '100%',
      fontSize: input.fontSize,
      color: colors.text,
    },
    iconWrap: {
      paddingHorizontal: input.padding / 2,
      justifyContent: 'center',
      height: '100%',
    },
    dropdownActivityIndicatorView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownContainer: {
      padding: 10,
      borderRadius: 6,
      overflow: 'hidden',
    },
    emptyListView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
    },
    dropdownRow: {
      flex: 1,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scale(10),
      paddingVertical: scale(10),
      marginVertical: scale(7),
      borderRadius: 6,
    },
    indicator: {
      marginHorizontal: 10,
    },
    dropdownIcon: {
      marginHorizontal: 10,
    },
    errorText: {
      fontSize: 12,
      marginTop: 4,
    },
  })
  return { inputStyles }
}
