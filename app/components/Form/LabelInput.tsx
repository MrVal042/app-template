import { IColors, scale } from '@constants'
import { IText } from '../Element'

export default function LabelInput({
  label,
  isRequired,
  value,
}: {
  value?: any
  label?: string
  isRequired?: boolean
}) {
  return (
    <>
      {label ? (
        <IText size={scale(14)} textTransform='capitalize'>
          {label}
          <IText color={IColors.dangerDark}>
            {isRequired && !value ? ' *' : ''}
          </IText>
        </IText>
      ) : null}
    </>
  )
}
