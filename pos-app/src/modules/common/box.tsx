import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { SpacingStyles, Theme } from '../../constants/theme'
import { useTheme } from '../../lib/contexts/theme-context'
import { cleanProps, getSpacing } from '../../lib/utils/get-spacing'

export type BoxProps = {
  backgroundColor?: keyof Theme['colors']
  radii?: keyof Theme['radii']
  border?: keyof Theme['borderVariants']
} & SpacingStyles &
  React.ComponentProps<typeof View>

export const Box = forwardRef<View, BoxProps>(
  (
    { style, backgroundColor = 'transparent', radii = 'none', border, ...rest },
    ref
  ) => {
    const { theme } = useTheme()
    const { spacingProps, ...clean } = cleanProps(rest)

    return (
      <View
        ref={ref}
        style={StyleSheet.flatten([
          {
            backgroundColor: theme.colors[backgroundColor],
            borderRadius: theme.radii[radii],
            ...theme.borderVariants[border || 'none'],
          },
          getSpacing(spacingProps, theme),
          style,
        ])}
        {...clean}
      />
    )
  }
)
