import { StyleSheet, View } from 'react-native'
import { themeColors } from '../constants/Colors'
import { useTheme } from '../lib/contexts/theme-context'
import { Button, Text } from '../modules/common'
import { DismissKeyboardView } from '../modules/helpers'
import { BagIcon, SearchIcon, ZapIcon } from '../modules/icons'

import { RootTabScreenProps } from '../types'
import { StoreScreen } from './app/store-screen'

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'User'>) {
  const { theme } = useTheme()

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.actions}>
        <StoreScreen />
      </View>
      <View style={styles.actions}>
        <Button
          radii="m"
          backgroundColor="buttonPrimary"
          px="m"
          py="l"
          mb="base"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text variant="large" color="background">
            Search
          </Text>
          <SearchIcon color="iconOnColor" />
        </Button>
        <Button
          radii="m"
          backgroundColor="layer"
          px="m"
          py="l"
          mb="base"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: themeColors.border.borderSubtle,
          }}
        >
          <Text variant="large" color="textPrimary">
            Start order
          </Text>
          <BagIcon color="iconSecondary" />
        </Button>
        <Button
          radii="m"
          backgroundColor="layer"
          px="m"
          py="l"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: themeColors.border.borderSubtle,
          }}
        >
          <Text variant="large" color="textPrimary">
            Checkout
          </Text>
          <ZapIcon color="iconSecondary" />
        </Button>
      </View>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeColors.background.background,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  actions: {
    display: 'flex',
    width: '100%',
  },
})
