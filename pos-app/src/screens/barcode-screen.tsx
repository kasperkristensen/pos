import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { request } from '../lib/api/variants/inventory-status'
import BarcodeScanner from '../modules/barcode-scanner'
import { RootTabScreenProps } from '../types'

type BoundingBox = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export default function BarcodeScreen({
  navigation,
}: RootTabScreenProps<'BarcodeScanner'>) {
  const isFocused = useIsFocused()

  const [isLoading, setIsLoading] = React.useState(false)

  const handleBarcodeScanned = async (barcode: string) => {
    setIsLoading(true)

    request(barcode)
      .then((variant) => {
        setIsLoading(false)
        alert(JSON.stringify(variant, null, 2))
      })
      .catch((error) => {
        setIsLoading(false)
        alert(JSON.stringify(error, null, 2))
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
