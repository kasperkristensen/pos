import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../lib/contexts/theme-context'
import { IconProps } from '../../types'

export const ZapIcon = ({ size = 24, color = 'iconPrimary' }: IconProps) => {
  const { theme } = useTheme()

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3.75 13.5L14.25 2.25L12 10.5H20.25L9.75 21.75L12 13.5H3.75Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
