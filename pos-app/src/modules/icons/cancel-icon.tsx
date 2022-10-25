import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../lib/contexts/theme-context'
import { IconProps } from '../../types'

export const CancelIcon = ({
  size = 24,
  color = 'iconPrimary',
  style,
  ...rest
}: IconProps) => {
  const { theme } = useTheme()

  return (
    <Svg width={size} height={size} style={style} viewBox="0 0 24 24" {...rest}>
      <Path
        d="M6 18L18 6M6 6L18 18"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
