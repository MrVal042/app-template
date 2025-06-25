import { useTheme } from '@constants'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetHandleProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import React, {
  FC,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Divider from './Divider'
import Icon from './Icon'

export interface Handles {
  handleOpen: () => void
  handleClose: () => void
  snapTo: (index: number) => void
  expand: () => void
  collapse: () => void
}

interface BottomSheetProps {
  children?: React.ReactNode
  scroll?: boolean
  dismissible?: boolean
  snapPoints?: (string | number)[]
  enableKeyboardAvoidance?: boolean
  showCloseButton?: boolean
  handleComponent?: FC<BottomSheetHandleProps>
  backgroundStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const IBottomSheet = forwardRef<Handles, BottomSheetProps>(
  (
    {
      children,
      scroll = false,
      dismissible = true,
      snapPoints = ['25%', '30', '50%', '90%'],
      enableKeyboardAvoidance = true,
      showCloseButton = true,
      handleComponent,
      backgroundStyle,
      containerStyle,
    },
    ref
  ) => {
    const { colors, isDarkMode } = useTheme()
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [index, setIndex] = useState(-1)

    const handleOpen = useCallback(() => {
      bottomSheetRef.current?.snapToIndex(0)
    }, [])

    const handleClose = useCallback(() => {
      bottomSheetRef.current?.close()
    }, [])

    const snapTo = useCallback((idx: number) => {
      bottomSheetRef.current?.snapToIndex(idx)
    }, [])

    const expand = useCallback(() => {
      bottomSheetRef.current?.expand()
    }, [])

    const collapse = useCallback(() => {
      bottomSheetRef.current?.collapse()
    }, [])

    useImperativeHandle(ref, () => ({
      handleOpen,
      handleClose,
      snapTo,
      expand,
      collapse,
    }))

    const ContentWrapper = enableKeyboardAvoidance ? KeyboardAvoidingView : View
    const ScrollWrapper = scroll ? BottomSheetScrollView : BottomSheetView

    return (
      <React.Fragment>
        <StatusBar
          style={isDarkMode ? 'light' : 'dark'}
          animated={true}
          translucent
        />
        <BottomSheet
          index={index}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          keyboardBlurBehavior='restore'
          keyboardBehavior='interactive'
          enableHandlePanningGesture={true}
          enablePanDownToClose={dismissible}
          enableContentPanningGesture={true}
          onChange={(index) => setIndex(index)}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.7}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior={dismissible ? 'close' : 'none'}
            />
          )}
          style={[
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 5,
            },
            containerStyle,
          ]}
          backgroundStyle={[
            {
              backgroundColor: colors.background,
              borderRadius: 16,
            },
            backgroundStyle,
          ]}
          handleComponent={handleComponent}
          handleIndicatorStyle={{
            backgroundColor: colors.grey[isDarkMode ? 600 : 500],
            width: 40,
            height: 4,
          }}
        >
          <ScrollWrapper
            style={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
          >
            <ContentWrapper
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.select({ ios: 0, android: 25 })}
              style={styles.keyboardAvoidingContainer}
            >
              <View style={styles.header}>
                <View style={{ width: 30 }} />
                {showCloseButton && (
                  <TouchableOpacity onPress={handleClose}>
                    <Icon name='close-circle-outline' size={24} />
                  </TouchableOpacity>
                )}
              </View>
              <Divider space='xxs' />
              {children}
              <Divider space='m' />
            </ContentWrapper>
          </ScrollWrapper>
        </BottomSheet>
      </React.Fragment>
    )
  }
)

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

IBottomSheet.displayName = 'BottomSheet'
export default React.memo(IBottomSheet)
