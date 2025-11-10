import {
  NotificationRequestInput,
  SchedulableTriggerInputTypes as TriggerInputTypes,
  scheduleNotificationAsync,
} from 'expo-notifications'

export const SchedulableTriggerInputTypes = TriggerInputTypes

export const schedulePushNotification = async (
  request?: NotificationRequestInput
) => {
  await scheduleNotificationAsync(
    request || {
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the test notification body',
        data: { data: 'goes here', test: { test1: 'more data' } },
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1,
      },
      identifier: 'text1',
    }
  )
}
