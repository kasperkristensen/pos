import { useIsFocused } from '@react-navigation/native'
import { useAdminDeleteReturnReason } from 'medusa-react'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { request } from '../lib/api/variants/inventory-status'
import { useStore } from '../lib/contexts/store-context'
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

  const { addItem } = useStore()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleBarcodeScanned = async (barcode: string) => {
    setIsLoading(true)

    request(barcode)
      .then((variantStatus) => {
        Object.keys(variantStatus).forEach((variant: string) => {
          if (variantStatus[variant]) {
            addItem({ variantId: variant, quantity: 1 })
          }
        })
        setIsLoading(false)
        alert('Item added to cart')
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
