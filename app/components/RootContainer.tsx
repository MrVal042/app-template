import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { height, useTheme } from '@constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Divider from './Divider'
import { IView } from './Element'
import Header from './Header'

export interface IContainer extends IHeader {
  children: React.ReactNode
  scroll?: boolean
}

export default function RootContainer({
  children,
  scroll,
  ...props
}: IContainer) {
  const { rBackground } = useTheme()
  const { top } = useSafeAreaInsets()

  return (
    <IView
      style={[
        styles.container,
        {
          paddingTop: top,
          alignItems: 'center',
          height: height * 1.2,
        },
      ]}
    >
      <Header {...props} />
      {scroll ? (
        <ScrollView
          style={[{ width: '100%' }, rBackground]}
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
    paddingHorizontal: 15,
  },
})
