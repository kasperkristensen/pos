import { useIsFocused } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { retrieveVariant } from '../lib/api/variants/retrieve'
import { useNotification } from '../lib/contexts/notification-context'
import BarcodeScanner from '../modules/barcode-scanner'
import { BottomScreenProps } from '../types'

type BoundingBox = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export default function BarcodeScreen({
  navigation,
}: BottomScreenProps<'BarcodeScanner'>) {
  const { navigate } = navigation

  const isFocused = useIsFocused()
  const { hideNotification, showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const handleBarcodeScanned = async (barcode: string) => {
    setIsLoading(true)

    retrieveVariant(barcode)
      .then(({ variant }) => {
        setIsLoading(false)
        console.log('got variant')
        hideNotification()
        navigate('Root', {
          screen: 'Product',
          params: {
            variant,
            barcode,
          },
        })
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error.message)
        showNotification({
          content: error.message,
          duration: 3000,
        })
      })
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <BarcodeScanner
          onBarcodeScanned={handleBarcodeScanned}
          isLoading={isLoading}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
