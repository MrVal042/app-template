import { IContainer, RootContainer } from '@components'
import { useApp } from '@hooks'
import { StatusBar } from 'expo-status-bar'

export default function AuthContainer({ children, ...props }: IContainer) {
  const { isDarkMode } = useApp()
  const statusBarStyle = isDarkMode ? 'light' : 'dark'

  return (
    <RootContainer {...props}>
      <StatusBar style={statusBarStyle} animated={true} translucent />
      {children}
    </RootContainer>
  )
}
