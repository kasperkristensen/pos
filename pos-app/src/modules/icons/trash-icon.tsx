import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../lib/contexts/theme-context'
import { IconProps } from '../../types'

export const TrashIcon = ({ size = 24, color = 'iconPrimary' }: IconProps) => {
  const { theme } = useTheme()

  return (
    <Svg width={size} height={size} viewBox="0 0 18 22" fill="none">
      <Path
        d="M11.74 8.00052L11.394 17.0005M6.606 17.0005L6.26 8.00052M16.228 4.79052C16.57 4.84252 16.91 4.89752 17.25 4.95652M16.228 4.79152L15.16 18.6735C15.1164 19.2387 14.8611 19.7667 14.445 20.1518C14.029 20.5368 13.4829 20.7507 12.916 20.7505H5.084C4.5171 20.7507 3.97102 20.5368 3.55498 20.1518C3.13894 19.7667 2.88359 19.2387 2.84 18.6735L1.772 4.79052M16.228 4.79052C15.0739 4.61604 13.9138 4.48362 12.75 4.39352M0.75 4.95552C1.09 4.89652 1.43 4.84152 1.772 4.79052M1.772 4.79052C2.92613 4.61604 4.08623 4.48362 5.25 4.39352M12.75 4.39352V3.47752C12.75 2.29752 11.84 1.31352 10.66 1.27652C9.55362 1.24116 8.44638 1.24116 7.34 1.27652C6.16 1.31352 5.25 2.29852 5.25 3.47752V4.39352M12.75 4.39352C10.2537 4.2006 7.74628 4.2006 5.25 4.39352"
        stroke={theme.colors[color]}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}
