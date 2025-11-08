import { BgImage, IContainer, RootContainer } from '@components'
import { useApp } from '@hooks'
import { StatusBar } from 'expo-status-bar'

interface IProps extends IContainer {
  hideBg?: boolean
}
export default function AuthContainer({ children, hideBg, ...props }: IProps) {
  const { isDarkMode } = useApp()
  const statusBarStyle = isDarkMode ? 'light' : 'dark'

  return (
    <RootContainer {...props}>
      <StatusBar style={statusBarStyle} animated={true} translucent />
      <BgImage hideBg={hideBg}>{children}</BgImage>
    </RootContainer>
  )
}
