import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../lib/contexts/theme-context'
import { IconProps } from '../../types'

export const EyeIcon = ({ size = 24, color = 'iconPrimary' }: IconProps) => {
  const { theme } = useTheme()

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M2.03589 12.322C1.96688 12.1146 1.96688 11.8904 2.03589 11.683C3.42289 7.51 7.35989 4.5 11.9999 4.5C16.6379 4.5 20.5729 7.507 21.9629 11.678C22.0329 11.885 22.0329 12.109 21.9629 12.317C20.5769 16.49 16.6399 19.5 11.9999 19.5C7.36189 19.5 3.42689 16.493 2.03689 12.322H2.03589Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12V12Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
