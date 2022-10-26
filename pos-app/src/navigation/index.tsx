/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native'
import { AddLineItemModal } from '../modules/cart'

import AuthenticationNavigator from './authentication'
import LinkingConfiguration from './linking-configuration'
import RootNavigator from './root'

export default function Navigation() {
  const isSignedIn = true

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {isSignedIn ? <RootNavigator /> : <AuthenticationNavigator />}
      <AddLineItemModal />
    </NavigationContainer>
  )
}
