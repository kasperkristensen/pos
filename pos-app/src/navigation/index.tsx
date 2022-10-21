/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'

import AuthenticationNavigator from './authentication'
import LinkingConfiguration from './linking-configuration'
import RootNavigator from './root'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  const isSignedIn = true

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {isSignedIn ? <RootNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  )
}
