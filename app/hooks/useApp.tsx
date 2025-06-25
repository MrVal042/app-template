import { useTheme } from '@constants'
import { AppRoute, useRootNavigationProp } from '@navigation'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '@store'

export default function useApp() {
  const { colors, isDarkMode } = useTheme()
  const store = useStore()
  const navigation =
    useNavigation<useRootNavigationProp<AppRoute, AppRoute, 'Tabs'>>()

  return {
    ...store,
    navigation,
    colors,
    isDarkMode,
  }
}
