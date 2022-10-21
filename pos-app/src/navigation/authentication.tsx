import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EmailAuthScreen from '../screens/auth/email-auth-screen'
import InitialAuthScreen from '../screens/auth/initial-auth-screen'
import PinAuthScreen from '../screens/auth/pin-auth-screen'
import { AuthenticationStackParamList } from '../types'

const Stack = createNativeStackNavigator<AuthenticationStackParamList>()

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InitialAuth"
        component={InitialAuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="EmailAuth" component={EmailAuthScreen} />
      <Stack.Screen name="PinAuth" component={PinAuthScreen} />
    </Stack.Navigator>
  )
}

export default AuthenticationNavigator
