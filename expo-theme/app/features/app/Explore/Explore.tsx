import { Divider, IButton, IText, RootContainer } from '@components'
import { IColors } from '@constants'
import { uStyles } from '@styles'
import { View, StyleSheet } from 'react-native'

export default function Explore() {
  return (
    <RootContainer title='Explore' scroll>
      <View style={styles.container}>
        <IText>Default text</IText>
        <IText variant='light'>Light text</IText>
        <IText variant='title'>Title text</IText>
        <IText variant='semibold'>Semibold text</IText>
        <IText variant='bold'>Bold text</IText>
        <IText variant='extraBold'>Extra Bold text</IText>
        <IText color={IColors.primary}>Colored text</IText>
        <Divider />
        <IText>Explore button</IText>
        <IButton label='Primary' />
        <IButton label='Secondary' variant='secondary' />
        <IButton label='Disabled' disabled />
        <IButton label='Change label color' color={IColors.dangerDark} />
        <IButton label='Change backgroundColor' bgColor={IColors.successDark} />
        <IButton
          label='Change backgroundColor disabled'
          bgColor={IColors.successDark}
          disabled
        />
        <IButton label='Outline' variant='outline' />
        <IButton label='Disabled - outline' disabled variant='outline' />
        <IButton
          label='Change outline color'
          color={IColors.dangerDark}
          variant='outline'
        />
        <View style={uStyles.flexBtw}>
          <IButton label='With icon' icon={{ name: 'bucket' }} width={'45%'} />
          <IButton
            label='Right icon'
            icon={{ name: 'settings-outline', alignIcon: 'right' }}
            width={'45%'}
          />
        </View>
        <View style={uStyles.flexRow}>
          <IButton label='Width:50%' width={'50%'} height={35} />
          <IButton label='height = {35}' height={35} width={'48%'} />
        </View>
      </View>
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
})
