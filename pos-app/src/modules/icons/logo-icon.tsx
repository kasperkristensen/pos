import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../lib/contexts/theme-context'
import { IconProps } from '../../types'

export const LogoIcon = ({ size = 24, color = 'iconPrimary' }: IconProps) => {
  const { theme } = useTheme()

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M8.5 3H5.5C4.39543 3 3.5 3.89543 3.5 5V10C3.5 11.1046 4.39543 12 5.5 12H8.5C9.60457 12 10.5 11.1046 10.5 10V5C10.5 3.89543 9.60457 3 8.5 3Z"
        stroke={theme.colors[color]}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.5 3H16.5C15.3954 3 14.5 3.89543 14.5 5V6C14.5 7.10457 15.3954 8 16.5 8H19.5C20.6046 8 21.5 7.10457 21.5 6V5C21.5 3.89543 20.6046 3 19.5 3Z"
        stroke={theme.colors[color]}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.5 12H16.5C15.3954 12 14.5 12.8954 14.5 14V19C14.5 20.1046 15.3954 21 16.5 21H19.5C20.6046 21 21.5 20.1046 21.5 19V14C21.5 12.8954 20.6046 12 19.5 12Z"
        stroke={theme.colors[color]}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.5 16H5.5C4.39543 16 3.5 16.8954 3.5 18V19C3.5 20.1046 4.39543 21 5.5 21H8.5C9.60457 21 10.5 20.1046 10.5 19V18C10.5 16.8954 9.60457 16 8.5 16Z"
        stroke={theme.colors[color]}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}
