import { useProduct } from 'medusa-react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import useVariant from '../../lib/api/variants/retrieve'
import { useStore } from '../../lib/contexts/store-context'
import { Box, Button, Divider, Text } from '../../modules/common'
import { BackIcon } from '../../modules/icons'
import { ImageSlider } from '../../modules/product'
import { ActionScreenProps } from '../../types'

export default function ProductScreen({
  navigation,
  route: {
    params: { variant: initialData, barcode },
  },
}: ActionScreenProps<'Product'>) {
  const { navigate, canGoBack, goBack } = navigation

  const { variant } = useVariant(barcode, {
    initialData: {
      variant: initialData,
      response: undefined,
    },
  })

  const { product } = useProduct(variant?.product_id!, {
    enabled: !!variant?.product_id,
  })

  const handleBack = () => {
    if (canGoBack()) {
      goBack()
    }

    navigate('Bottom', {
      screen: 'Home',
    })
  }

  const { addItem } = useStore()

  return (
    <Box backgroundColor="background" style={styles.container}>
      <SafeAreaView>
        <Box pb="base" px="l" pt="l" style={styles.header}>
          <Box>
            <Text variant="large" style={styles.title}>
              {product?.title} ({variant?.title})
            </Text>
            <Text variant="large" color="textSecondary">
              From 1.345,00 kr.
            </Text>
          </Box>
          <Pressable onPress={handleBack}>
            <BackIcon color="iconPlaceholder" />
          </Pressable>
        </Box>
      </SafeAreaView>
      <ScrollView>
        <Box px="l">
          <Divider width={32} backgroundColor="subtle" />
          <Box mt="base" mb="xl">
            <Text variant="base" color="textHelper">
              {product?.description}
            </Text>
          </Box>
          <Box mb="xl">
            <ImageSlider images={product?.images} />
          </Box>
        </Box>
      </ScrollView>
      <SafeAreaView>
        <Box pt="base" px="l" border="subtle" style={styles.actions}>
          <Button
            backgroundColor="buttonPrimary"
            radii="m"
            px="m"
            py="base"
            mb="s"
            style={styles.button}
            onPress={() => addItem({ variantId: variant?.id!, quantity: 1 })}
          >
            <Text variant="large" color="textOnColor">
              Add to bag
            </Text>
          </Button>
          <Button
            backgroundColor="buttonSecondary"
            border="subtle"
            radii="m"
            px="m"
            py="base"
            style={styles.button}
            onPress={handleBack}
          >
            <Text variant="large" color="textPrimary">
              Cancel
            </Text>
          </Button>
        </Box>
      </SafeAreaView>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
  },
  actions: {
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
