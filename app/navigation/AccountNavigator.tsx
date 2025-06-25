import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  AccountScreen,
  ChangePassword,
  EditProfile,
  FAndQ,
  HelpSupport,
  MailUs,
  NotificationSettings,
  Profile,
  Security,
} from '@screens'

const { Navigator, Screen } = createNativeStackNavigator<AccountRoutes>()

export default function AccountNavigator() {
  return (
    <Navigator
      initialRouteName='AccountEntry'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='NotificationSettings' component={NotificationSettings} />
      <Screen name='ChangePassword' component={ChangePassword} />
      <Screen name='AccountEntry' component={AccountScreen} />
      <Screen name='HelpSupport' component={HelpSupport} />
      <Screen name='EditProfile' component={EditProfile} />
      <Screen name='Security' component={Security} />
      <Screen name='Profile' component={Profile} />
      <Screen name='MailUs' component={MailUs} />
      <Screen name='FAndQ' component={FAndQ} />
    </Navigator>
  )
}
