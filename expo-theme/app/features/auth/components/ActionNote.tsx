import { IText } from '@components'
import { IColors, width } from '@constants'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

type IProps = {
  label: string
  actionText: string
  onPress: () => void
  actionColor?: string
}
export default function ActionNote({
  actionColor,
  actionText,
  label,
  onPress,
}: IProps) {
  return (
    <View style={styles.wrap}>
      <View style={{ maxWidth: '70%' }}>
        <IText textAlign='center' adjustsFontSizeToFit={true} numberOfLines={1}>
          {label}
        </IText>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.actionWrap}>
        <IText
          variant='bold'
          textAlign='left'
          color={actionColor || IColors.primary}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{ textDecorationLine: 'underline' }}
        >
          {actionText}
        </IText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
    width: width * 0.95,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  actionWrap: {
    maxWidth: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
