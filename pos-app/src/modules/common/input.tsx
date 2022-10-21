import { forwardRef } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useTheme } from '../../lib/contexts/theme-context'

type Props = React.ComponentPropsWithRef<typeof TextInput>

export const Input = forwardRef<TextInput, Props>(({ style, ...rest }, ref) => {
  const { theme } = useTheme()

  return (
    <TextInput
      ref={ref}
      placeholderTextColor={theme.colors.textPlaceholder}
      style={StyleSheet.flatten([
        {
          textAlignVertical: 'center',
          backgroundColor: theme.colors.fieldPrimary,
          paddingHorizontal: theme.spacing.base,
          paddingTop: 20,
          paddingBottom: 20,
          borderRadius: theme.radii.m,
          color: theme.colors.textPrimary,
          ...theme.textVariants.large,
          ...theme.borderVariants.subtle,
          lineHeight: 0,
        },
        style,
      ])}
      {...rest}
    />
  )
})
