type AuthRoutes = {
  Login: undefined
  Signup: undefined
  ForgotPassword: undefined
  ResetPassword: undefined
  Onboard: undefined
  VerifyClaim: { email: string }
  Welcome: undefined
}

// TabNavigator /////////////////////////////////////////////////
type TabRoutes = {
  Home: undefined
  Explore: undefined
  Account: undefined
}

type AccountRoutes = {
  ChangePassword: undefined
  DeleteAccount: undefined
  AccountEntry: undefined
  EditProfile: undefined
  HelpSupport: undefined
  Security: undefined
  Profile: undefined
  CallUs: undefined
  MailUs: undefined
  ChatUs: undefined
  FAndQ: undefined
}

interface NotificationRoutes {
  NotificationEntry: undefined
  NotificationDetails: { notificationId: string }
}
