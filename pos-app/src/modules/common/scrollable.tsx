import { forwardRef } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SpacingStyles, Theme } from '../../constants/theme'
import { useTheme } from '../../lib/contexts/theme-context'
import { cleanProps, getSpacing } from '../../lib/utils/get-spacing'

type Props = {
  backgroundColor?: keyof Theme['colors']
  radii?: keyof Theme['radii']
} & SpacingStyles &
  React.ComponentProps<typeof ScrollView>

export const Scrollable = forwardRef<ScrollView, Props>(
  ({ style, backgroundColor = 'primary', radii = 'none', ...rest }, ref) => {
    const { theme } = useTheme()
    const { spacingProps, ...clean } = cleanProps(rest)

    return (
      <ScrollView
        ref={ref}
        style={StyleSheet.flatten([
          {
            backgroundColor: theme.colors[backgroundColor],
            borderRadius: theme.radii[radii],
          },
          getSpacing(spacingProps, theme),
          style,
        ])}
        {...clean}
      />
    )
  }
)
