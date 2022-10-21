import { forwardRef } from 'react'
import { StyleSheet, Text as RNText } from 'react-native'
import { Theme } from '../../constants/theme'
import { useTheme } from '../../lib/contexts/theme-context'
import { cleanProps, getSpacing } from '../../lib/utils/get-spacing'

type Props = {
  color?: keyof Theme['colors']
  variant?: keyof Theme['textVariants']
} & React.ComponentProps<typeof RNText>

export const Text = forwardRef<RNText, Props>(
  ({ color = 'textPrimary', variant = 'base', style, ...rest }, ref) => {
    const { theme } = useTheme()
    const { spacingProps, ...clean } = cleanProps(rest)

    return (
      <RNText
        ref={ref}
        style={StyleSheet.flatten([
          {
            color: theme.colors[color],
            ...theme.textVariants[variant],
          },
          getSpacing(spacingProps, theme),
          style,
        ])}
        {...clean}
      />
    )
  }
)