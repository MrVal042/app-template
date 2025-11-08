import { Platform, StyleSheet } from 'react-native'

import { height } from '@constants'

export const uStyles = StyleSheet.create({
  avatarWrap: {
    gap: 5,
    zIndex: 1,
    marginLeft: 10,
    borderRadius: 99,
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'flex-start',
    bottom: -(Platform.OS === 'ios' ? height * 0.05 : height * 0.06),
  },
  container: { flex: 1, width: '100%' },
  content: { width: '100%', flex: 1, paddingHorizontal: 10, gap: 10 },
  card: {
    gap: 10,
    padding: 10,
    borderRadius: 10,
    marginVertical: 2.5,
  },
  dot: {
    width: 7.5,
    height: 7.5,
    borderRadius: 10,
  },
  flexBtw: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footer: {
    gap: 10,
    width: '100%',
    paddingTop: -10,
    marginTop: 'auto',
    paddingBottom: Platform.select({ ios: 30, android: 30 }),
  },
  iconWrap: {
    padding: 5,
    borderRadius: 99,
  },
  inputWrap: {
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderStyle: 'dashed',
    justifyContent: 'space-between',
  },
  item: {
    width: '100%',
    gap: 10,
    padding: 10,
    borderRadius: 6,
    marginTop: 3,
    borderWidth: 0.2,
  },

  modelContainer: {
    height: height * 0.89,
    top: height * 0.01,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  toggle: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
})
