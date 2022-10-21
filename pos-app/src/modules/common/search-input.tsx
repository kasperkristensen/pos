import { ComponentPropsWithRef, forwardRef } from 'react'
import { Pressable, StyleSheet, TextInput } from 'react-native'
import { SpacingStyles } from '../../constants/theme'
import { useTheme } from '../../lib/contexts/theme-context'
import { cleanProps } from '../../lib/utils/get-spacing'
import { BarcodeIcon } from '../icons'
import { Box } from './box'

type SearchInputProps = {
  useScanner?: boolean
  toggleScanner: () => void
  query?: string
  setQuery: (query?: string) => void
} & SpacingStyles &
  Omit<ComponentPropsWithRef<typeof TextInput>, 'onChange' | 'value'>

export const SearchInput = forwardRef<TextInput, SearchInputProps>(
  ({ style, useScanner, toggleScanner, query, setQuery, ...props }, ref) => {
    const { theme } = useTheme()
    const { spacingProps, ...clean } = cleanProps(props)

    return (
      <Box
        {...spacingProps}
        px="base"
        style={StyleSheet.flatten([
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.colors.fieldPrimary,
            borderRadius: theme.radii.m,
            color: theme.colors.textPrimary,
            ...theme.borderVariants.subtle,
          },
          style,
        ])}
      >
        <TextInput
          ref={ref}
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={theme.colors.textPlaceholder}
          style={StyleSheet.flatten([
            {
              flex: 1,
              backgroundColor: theme.colors.transparent,
              paddingVertical: 20,
              ...theme.textVariants.large,
              lineHeight: 0,
            },
            style,
          ])}
          {...clean}
        />
        <Pressable onPress={toggleScanner}>
          <BarcodeIcon color={useScanner ? 'iconPrimary' : 'iconPlaceholder'} />
        </Pressable>
      </Box>
    )
  }
)
