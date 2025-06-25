import { IColors } from '@constants'
import { useApp } from '@hooks'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { OtpInput, OtpInputProps } from 'react-native-otp-entry'

interface IProps extends OtpInputProps {
  accessibilityLabel?: string
  style?: StyleProp<ViewStyle>
}
export default function OtpField({
  numberOfDigits = 6,
  disabled,
  style,
  secureTextEntry,
  accessibilityLabel,
  ...props
}: IProps) {
  const { colors, isDarkMode } = useApp()
  return (
    <OtpInput
      {...props}
      type='numeric'
      autoFocus={false}
      placeholder='******'
      blurOnFilled={true}
      disabled={disabled}
      focusColor={colors.primary}
      numberOfDigits={numberOfDigits}
      secureTextEntry={secureTextEntry}
      focusStickBlinkingDuration={500}
      textInputProps={{
        accessibilityLabel: accessibilityLabel || 'One-Time Password',
      }}
      textProps={{
        accessibilityRole: 'text',
        accessibilityLabel: accessibilityLabel || 'OTP digit',
        allowFontScaling: false,
      }}
      theme={{
        containerStyle: {
          ...styles.container,
          gap: numberOfDigits > 4 ? 10 : 30,
        },
        pinCodeContainerStyle: {
          flex: 1,
          ...styles.pinCodeContainer,
          borderColor: IColors.grey[isDarkMode ? 700 : 300],
          aspectRatio: 2 / 2.2,
          maxHeight: 60,
          width: 50,
        },
        pinCodeTextStyle: { color: colors.text, fontSize: 24 },
        focusedPinCodeContainerStyle: styles.activePinCodeContainer,
        placeholderTextStyle: {
          color: colors.grey[isDarkMode ? 900 : 600],
        },
        filledPinCodeContainerStyle: {
          backgroundColor: colors.grey[isDarkMode ? 700 : 300],
        },
        focusStickStyle: { height: 15 },
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinCodeContainer: {
    borderRadius: 8,
    backgroundColor: IColors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pinCodeText: {
    fontSize: 24,
    color: '#333',
  },
  activePinCodeContainer: {
    borderWidth: 1,
    borderColor: IColors.primary,
  },
})
