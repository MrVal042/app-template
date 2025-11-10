import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { height } from '@constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Divider from './Divider'
import { IView } from './Element'
import Header from './Header'
import { useTheme } from '@hooks'

export interface IContainer extends IHeader {
  children: React.ReactNode
  scroll?: boolean
}

export const duration = 500
export default function RootContainer({
  children,
  scroll,
  leftAdornment,
  rightAdornment,
  ...props
}: IContainer) {
  const { colors } = useTheme()
  const { top } = useSafeAreaInsets()

  const dStyle = {
    paddingTop: top,
    backgroundColor: colors.background,
  }

  return (
    <IView style={[styles.container, dStyle]}>
      <Header {...{ ...props, leftAdornment, rightAdornment }} />
      {scroll ? (
        <ScrollView
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          {children}
          <Divider space='s' />
        </ScrollView>
      ) : (
        children
      )}
    </IView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    height: height * 1.2,
    paddingHorizontal: 15,
  },
})
