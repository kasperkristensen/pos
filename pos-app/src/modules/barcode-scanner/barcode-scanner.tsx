import {
  BarCodeBounds,
  BarCodePoint,
  BarCodeScannedCallback,
  BarCodeScanner,
} from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { AreaOfInterest } from './area-of-interest'
import { PermissionMessage } from './permission-message'

type BoundingBox = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

type CameraDirection = 'back' | 'front'

type Props = {
  /**
   * The action to perform when a barcode is scanned.
   */
  onBarcodeScanned: (barcode: string) => void
  /**
   * Indicates if the provided action is currently being performed.
   */
  isLoading?: boolean
}

export const BarcodeScanner = ({
  onBarcodeScanned,
  isLoading = false,
}: Props) => {
  const [boundingBox, setBoundingBox] = useState<BoundingBox>({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  })
  const [cameraDirection, setCameraDirection] =
    useState<CameraDirection>('back')
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isArmed, setIsArmed] = useState<boolean>(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
      setIsArmed(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  useEffect(() => {
    if (!isArmed) {
      const timeout = setTimeout(() => {
        setIsArmed(true)
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [isArmed])

  /**
   * Sets the bounding box for the area of interest, as soon as the view is
   * rendered.
   */
  const loadBoundingBox = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout

    setBoundingBox({
      minX: x,
      maxX: x + width,
      minY: y,
      maxY: y + height,
    })
  }

  /**
   * Validates that the scanned barcode is within the bounding box,
   * and if so returns true. This is done to prevent the barcode scanner
   * from scanning barcodes that are not intended to be scanned.
   */
  const validateBounds = (
    cornerPoints?: BarCodePoint[],
    bounds?: BarCodeBounds
  ) => {
    const { minX, minY, maxX, maxY } = boundingBox

    const isWithinX = (x: number) => x >= minX && x <= maxX
    const isWithinY = (y: number) => y >= minY && y <= maxY

    const isWithinBoundingBox = (point: BarCodePoint) => {
      return isWithinX(point.x) && isWithinY(point.y)
    }

    if (cornerPoints) {
      return cornerPoints.every(isWithinBoundingBox)
    }

    if (bounds) {
      const { origin, size } = bounds
      const { x, y } = origin
      const { width, height } = size

      return (
        isWithinX(x) &&
        isWithinY(y) &&
        isWithinX(x + width) &&
        isWithinY(y + height)
      )
    }

    return false
  }

  /**
   * Flips the camera direction between back and front facing camera.
   */
  const flipCamera = () => {
    setCameraDirection(cameraDirection === 'back' ? 'front' : 'back')
  }

  /**
   * Callback for when a barcode is scanned.
   */
  const onScan: BarCodeScannedCallback = ({ data, cornerPoints, bounds }) => {
    if (!validateBounds(cornerPoints, bounds)) {
      return
    }

    setIsArmed(false)
    onBarcodeScanned(data)
  }

  return (
    <View style={styles.container}>
      <View style={styles.boundingBox} onLayout={loadBoundingBox}>
        <AreaOfInterest />
        <PermissionMessage hasPermission={hasPermission} />
      </View>

      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={isArmed ? onScan : undefined}
          style={StyleSheet.absoluteFillObject}
          type={cameraDirection}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boundingBox: {
    width: 326,
    height: 312,
    position: 'relative',
    zIndex: 1,
  },
})
