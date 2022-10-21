import { ComponentProps } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

export const TabButton = ({
  children,
  style,
  ...rest
}: ComponentProps<typeof View>) => {
  return (
    <Pressable
      style={StyleSheet.flatten([
        {
          width: 64,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        },
        style,
      ])}
      {...rest}
    >
      {children}
    </Pressable>
  )
}
