import {
  Divider,
  EmptyComponent,
  IButton,
  IText,
  RootContainer,
} from '@components'
import { useApp } from '@hooks'
import { getToday } from '@utils'
import React, { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { schedulePushNotification } from '@constants'
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

const identifier = `welcomeNotification ${getToday('date')}`

export default function NotificationEntry() {
  const { notification, toggleHasNotification, colors } = useApp()

  useEffect(() => {
    const timeout = setTimeout(async () => {
      toggleHasNotification()
      await Notifications.dismissNotificationAsync(identifier)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [toggleHasNotification])

  const handleTest = async () => {
    const count = notification.length
    await schedulePushNotification({
      content: {
        title: `Testing ${Platform.OS} notification ${count}`,
        body: `Here is the test notification body on ${Platform.OS}`,
        data: { data: 'goes here', test: { test1: 'more data' } },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1,
      },
      identifier: `testing ${count}`,
    })
  }

  return (
    <RootContainer title='Notification'>
      <FlatList
        data={notification}
        style={styles.container}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={<EmptyComponent />}
        ListHeaderComponent={
          <>
            <Divider />
            <IText variant='bold' textAlign='center'>
              Welcome to push and in app notifications
            </IText>
          </>
        }
        keyExtractor={(item, index) => item.request.identifier + index}
        renderItem={({ item }) => {
          const { body, title } = item.request.content
          return (
            <TouchableOpacity
              style={[styles.item, { backgroundColor: colors.cardDark }]}
              activeOpacity={0.7}
              onPress={async () => {
                const data = item.request.content.data
                alert(JSON.stringify(data, null, 2))

                // dismiss specific notification by identifier
                await Notifications.dismissNotificationAsync(
                  item.request.identifier
                )
              }}
            >
              <IText variant='bold' size={15}>
                {title}
              </IText>
              <IText> {body} </IText>
            </TouchableOpacity>
          )
        }}
      />

      <View style={{ marginTop: 'auto', width: '100%', gap: 10 }}>
        <IButton label='Test notification' onPress={handleTest} />
        <IButton
          variant='outline'
          label='Clear All Notifications'
          onPress={async () => {
            await Notifications.dismissAllNotificationsAsync()
          }}
        />
      </View>
      <Divider space='xl' />
    </RootContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 15,
  },
  item: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    width: '100%',
  },
})
