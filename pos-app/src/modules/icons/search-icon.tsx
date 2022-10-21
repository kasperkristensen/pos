import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../lib/contexts/theme-context'
import { IconProps } from '../../types'

export const SearchIcon = ({ size = 24, color = 'iconPrimary' }: IconProps) => {
  const { theme } = useTheme()

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M21 21.0008L15.803 15.8038M15.803 15.8038C17.2096 14.3972 17.9998 12.4895 17.9998 10.5003C17.9998 8.51108 17.2096 6.60336 15.803 5.19678C14.3964 3.79021 12.4887 3 10.4995 3C8.51031 3 6.60258 3.79021 5.196 5.19678C3.78943 6.60336 2.99922 8.51108 2.99922 10.5003C2.99922 12.4895 3.78943 14.3972 5.196 15.8038C6.60258 17.2104 8.51031 18.0006 10.4995 18.0006C12.4887 18.0006 14.3964 17.2104 15.803 15.8038V15.8038Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
