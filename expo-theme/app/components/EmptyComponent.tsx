import { height as screenHeight } from '@constants'
import { DimensionValue, StyleSheet, View } from 'react-native'
import { IText } from './Element'
import Icon from './Icon'

export default function EmptyComponent({
  height = screenHeight * 0.4,
}: {
  height?: DimensionValue
}) {
  return (
    <View style={[styles.empty, { height }]}>
      <IText variant='title' size={16}>
        No results found
      </IText>
      <Icon name='inbox' size={80} style={{ marginTop: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    marginTop: 40,
    opacity: 0.7,
    height: '100%',
    justifyContent: 'center',
  },
})
