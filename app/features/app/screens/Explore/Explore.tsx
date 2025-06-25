import { IText, RootContainer } from '@components'
import { StyleSheet, View } from 'react-native'

export default function Explore() {
  return (
    <RootContainer title='Explore'>
      <View style={styles.container}>
        <IText>Explore Screen</IText>
      </View>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
