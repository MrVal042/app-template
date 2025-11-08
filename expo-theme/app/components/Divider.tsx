import { SPACING } from '@constants'
import { IView } from './Element'

interface Props {
  space?: keyof typeof SPACING
  horizontal?: boolean
}

/**
 * @param space – t: 5, s: 7.5, m: 12.5, l: 17, xl: 22, xxl: 28, xxxl: 33 (scaled)
 */
export default function Divider({
  space = 'default',
  horizontal = false,
}: Props) {
  const styleProperty = horizontal ? 'marginHorizontal' : 'marginVertical'
  const marginSize = SPACING[space] || SPACING.default

  return <IView style={{ [styleProperty]: marginSize }} />
}
