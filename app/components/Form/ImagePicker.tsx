import { IColors, useTheme } from '@constants'
import * as ImagePicker from 'expo-image-picker'
import { Asset } from 'expo-media-library'
import {
  FlatList,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { IText } from '../Element'
import Icon from '../Icon'

interface ImagePickerProps {
  label: string
  images: Asset[] | string[] | null
  onImagesChange: (images: Asset[] | string[]) => void
  error?: string | null
  style?: StyleProp<ViewStyle>
  multiple?: boolean
  allowTakePhoto?: boolean
}

export default function ImagePickerComponent({
  label,
  images,
  onImagesChange,
  error,
  style,
  multiple = false,
  allowTakePhoto = true,
}: ImagePickerProps) {
  const { colors, isDarkMode } = useTheme()

  const inputStyle = {
    backgroundColor: colors.grey[isDarkMode ? 700 : 300],
    borderBottomWidth: error ? 1 : 2.5,
    borderWidth: error ? 1 : 0,
    borderColor: error ? colors.dangerDark : colors.primary,
    borderBottomColor: error ? colors.dangerDark : colors.primary,
  }

  const pickImage = async (source: 'gallery' | 'camera') => {
    let result: ImagePicker.ImagePickerResult

    if (source === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!')
        return
      }
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      })
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!')
        return
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: multiple,
      })
    }

    if (!result.canceled) {
      if (multiple) {
        const newImages = images ? [...images] : []
        result.assets.forEach((asset) => {
          newImages.push(
            Platform.OS === 'ios' ? asset.uri : (asset as string | Asset)
          )
        })
        onImagesChange(newImages as Asset[] | string[])
        return
      } else {
        onImagesChange([
          Platform.OS === 'ios' ? result.assets[0].uri : result.assets[0],
        ] as Asset[] | string[])
        return
      }
    }
  }

  const removeImage = (index: number) => {
    if (images) {
      const newImages = [...images]
      newImages.splice(index, 1)
      onImagesChange(newImages as Asset[] | string[])
    }
  }

  const selectedImages = ['0', '1']

  return (
    <View style={styles.container}>
      <IText size={16} textTransform='capitalize'>
        {label}
      </IText>
      {multiple ? (
        <FlatList
          data={selectedImages}
          columnWrapperStyle={{ gap: 20 }}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.imgWrap,
                {
                  width: selectedImages.length < 1 ? '100%' : '47%',
                  marginBottom: 20,
                },
              ]}
            >
              {/* <Image
                source={{
                  uri: typeof item === 'string' ? item : item.uri,
                }}
                style={styles.image}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Icon name='close' size={16} color={colors.danger} />
              </TouchableOpacity> */}
              <Icon name='library-add' size={50} />
            </View>
          )}
          numColumns={2}
          keyExtractor={(_, index) => String(index)}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.imgWrap}>
          {/* <Image
            source={{
              uri: typeof item === 'string' ? item : item.uri,
            }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeImage(index)}
          >
            <Icon name='close' size={16} color={colors.danger} />
          </TouchableOpacity> */}
          <Icon name='library-add' size={50} />
        </View>
      )}

      {/* <View style={[styles.inputWrap, inputStyle, style]}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage('gallery')}
          >
            <Icon name='image' size={20} color={colors.primary} />
            <IText style={styles.buttonText}>
              Choose {multiple ? 'Images' : 'Image'}
            </IText>
          </TouchableOpacity>

          {allowTakePhoto && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => pickImage('camera')}
            >
              <Icon name='camera' size={20} color={colors.primary} />
              <IText style={styles.buttonText}>Take Photo</IText>
            </TouchableOpacity>
          )}
        </View>
      </View> */}

      {error ? (
        <IText color={colors.danger} textAlign='right' size={12}>
          {error}
        </IText>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  imgWrap: {
    height: 200,
    borderWidth: 0.2,
    backgroundColor: IColors.grey[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
