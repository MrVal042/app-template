import { StyleSheet, View } from 'react-native'
import { IText } from './Element'

export default function ComingSoon({ label }: { label?: string }) {
  return (
    <View style={styles.container}>
      <IText>{label} Coming Soon</IText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
