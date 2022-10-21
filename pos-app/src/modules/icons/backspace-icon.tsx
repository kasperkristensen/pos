import Svg, { Path } from 'react-native-svg'
import { useTheme } from '../../lib/contexts/theme-context'
import { IconProps } from '../../types'

export const BackspaceIcon = ({
  size = 24,
  color = 'iconPrimary',
}: IconProps) => {
  const { theme } = useTheme()

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12.0001 9.75L14.2501 12M14.2501 12L16.5001 14.25M14.2501 12L16.5001 9.75M14.2501 12L12.0001 14.25M9.42007 19.17L3.04507 12.795C2.8344 12.5841 2.71606 12.2981 2.71606 12C2.71606 11.7019 2.8344 11.4159 3.04507 11.205L9.42007 4.83C9.63107 4.619 9.91807 4.5 10.2161 4.5H19.5001C20.0968 4.5 20.6691 4.73705 21.0911 5.15901C21.513 5.58097 21.7501 6.15326 21.7501 6.75V17.25C21.7501 17.8467 21.513 18.419 21.0911 18.841C20.6691 19.2629 20.0968 19.5 19.5001 19.5H10.2161C9.91807 19.5 9.63107 19.381 9.42007 19.17Z"
        stroke={theme.colors[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
