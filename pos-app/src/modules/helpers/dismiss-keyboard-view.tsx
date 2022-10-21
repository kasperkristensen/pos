import React from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'

/**
 * A helper view that dismisses the keyboard when tapped.
 * Useful for wrapping forms, to allow the user to dismiss
 * their keyboard by tapping outside of a input field.
 */
export const DismissKeyboardView = ({
  children,
  ...rest
}: React.ComponentProps<typeof View>) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View {...rest}>{children}</View>
    </TouchableWithoutFeedback>
  )
}
