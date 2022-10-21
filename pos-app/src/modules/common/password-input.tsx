import { forwardRef, useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { useTheme } from '../../lib/contexts/theme-context'
import { EyeIcon, EyeOffIcon } from '../icons'

type Props = React.ComponentPropsWithRef<typeof TextInput>

export const PasswordInput = forwardRef<TextInput, Props>(
  ({ style, ...rest }, ref) => {
    const { theme } = useTheme()
    const [hide, setHide] = useState(true)

    return (
      <View
        style={StyleSheet.flatten([
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.colors.fieldPrimary,
            paddingHorizontal: theme.spacing.base,
            borderRadius: theme.radii.m,
            color: theme.colors.textPrimary,
            ...theme.borderVariants.subtle,
            lineHeight: 0,
          },
          style,
        ])}
      >
        <TextInput
          ref={ref}
          secureTextEntry={hide}
          placeholderTextColor={theme.colors.textPlaceholder}
          style={StyleSheet.flatten([
            {
              flex: 1,
              textAlignVertical: 'top',
              backgroundColor: theme.colors.transparent,
              paddingTop: 20,
              paddingBottom: 20,
              ...theme.textVariants.large,
            },
            style,
          ])}
          {...rest}
        />
        <Pressable onPress={() => setHide(!hide)}>
          {hide ? <EyeIcon /> : <EyeOffIcon />}
        </Pressable>
      </View>
    )
  }
)
