import { StyleSheet, View } from 'react-native'
import { themeColors } from '../constants/Colors'
import { useTheme } from '../lib/contexts/theme-context'
import { Button, Text } from '../modules/common'
import { DismissKeyboardView } from '../modules/helpers'
import { BagIcon, SearchIcon, ZapIcon } from '../modules/icons'
import { ImageSlider } from '../modules/product'

import { RootTabScreenProps } from '../types'

import { Image } from '@medusajs/medusa'

const fakeImages: Omit<Image, 'beforeInsert'>[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1662581871625-7dbd3ac1ca18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80',
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
    metadata: {},
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1666526257891-7ddde95571fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
    metadata: {},
  },
]

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'User'>) {
  const { theme } = useTheme()

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.actions}>
        <ImageSlider images={fakeImages} />
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
