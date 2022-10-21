import { StyleSheet, View } from 'react-native'
import { theme } from '../constants/theme'

import PinLogin from '../modules/pin-login'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <PinLogin />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
})
