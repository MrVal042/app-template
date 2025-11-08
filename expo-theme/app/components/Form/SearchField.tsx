import { IColors } from '@constants'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import { IView } from '../Element'
import Icon from '../Icon'
import { useTheme } from '@hooks'

interface SearchFieldProps extends TextInputProps {
  onPressClear?: () => void
}

export default function SearchField({
  onPressClear,
  value,
  ...props
}: SearchFieldProps) {
  const { colors, isDarkMode } = useTheme()
  return (
    <IView
      style={[
        styles.container,
        {
          backgroundColor: colors.grey[isDarkMode ? 900 : 100],
          borderColor: colors.grey[400],
        },
      ]}
    >
      <Icon name='search-outline' color={colors.grey[600]} />
      <TextInput
        {...props}
        value={value}
        autoCorrect={false}
        autoCapitalize='none'
        placeholderTextColor={colors.grey[600]}
        style={[styles.input, { color: colors.text }]}
        placeholder='Search by location, property type...'
      />
      {Boolean(value) && (
        <TouchableOpacity style={{ padding: 5 }} onPress={onPressClear}>
          <Icon name='close-circle-outline' size={22} color={colors.text} />
        </TouchableOpacity>
      )}
    </IView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 0.2,
  },
  input: {
    backgroundColor: IColors.transparent,
    height: '100%',
    width: '80%',
  },
})
