import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { SpacingStyles, Theme } from '../../constants/theme'
import { useTheme } from '../../lib/contexts/theme-context'
import { cleanProps, getSpacing } from '../../lib/utils/get-spacing'

type Props = {
  width: number | string
  backgroundColor?: keyof Theme['colors']
} & SpacingStyles &
  React.ComponentProps<typeof View>

export const Divider = forwardRef<View, Props>(
  ({ style, width, backgroundColor, ...rest }, ref) => {
    const { theme } = useTheme()
    const { spacingProps, ...clean } = cleanProps(rest)

    return (
      <View
        ref={ref}
        style={StyleSheet.flatten([
          {
            height: 1,
            width,
            backgroundColor: backgroundColor
              ? theme.colors[backgroundColor]
              : theme.colors.subtle,
            ...getSpacing(spacingProps, theme),
          },
          style,
        ])}
        {...clean}
      />
    )
  }
)
