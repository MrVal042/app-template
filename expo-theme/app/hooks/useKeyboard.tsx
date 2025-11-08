import { useEffect, useState } from 'react'
import { Keyboard, KeyboardEvent, Platform } from 'react-native'

export default function useKeyboard() {
  const [visible, setVisible] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const handleShow = (e: KeyboardEvent) => {
      setVisible(true)
      setKeyboardHeight(e.endCoordinates?.height ?? 0)
    }

    const handleHide = () => {
      setVisible(false)
      setKeyboardHeight(0)
    }

    // iOS prefers 'will' events for smoother handling
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    const showListener = Keyboard.addListener(showEvent, handleShow)
    const hideListener = Keyboard.addListener(hideEvent, handleHide)

    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [])

  return { visible, keyboardHeight }
}
