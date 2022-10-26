import { useIsFocused, useNavigation } from '@react-navigation/native'
import {
  BarCodeBounds,
  BarCodePoint,
  BarCodeScannedCallback,
  BarCodeScanner,
} from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { LayoutChangeEvent, StatusBar, StyleSheet } from 'react-native'
import { useNotification } from '../../lib/contexts/notification-context'
import { Box, Button } from '../common'
import { CancelIcon, FlipIcon, SearchIcon } from '../icons'
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
  const { navigate } = useNavigation()

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

  const { showNotification, hideNotification } = useNotification()
  const hasFocus = useIsFocused()
  useEffect(() => {
    if (hasFocus) {
      showNotification({
        content: 'Point the camera at the barcode to scan the product',
        duration: 5000,
      })
    }
  }, [hasFocus])

  const goHome = () => {
    hideNotification()
    navigate('Root', {
      screen: 'Bottom',
      params: {
        screen: 'Home',
      },
    })
  }

  const goToSearch = () => {
    hideNotification()
    navigate('Root', {
      screen: 'Bottom',
      params: {
        screen: 'Search',
      },
    })
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
    <Box
      style={{
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Safe area for notifications */}
      <Box
        px="l"
        style={StyleSheet.flatten([
          styles.tooltipArea,
          {
            marginTop: StatusBar.currentHeight,
          },
        ])}
      />

      <Box style={styles.boundingBox} px="l" onLayout={loadBoundingBox}>
        <AreaOfInterest />
        <PermissionMessage hasPermission={hasPermission} />
      </Box>

      <Box style={styles.actionsArea}>
        <Button
          radii="full"
          backgroundColor="overlay"
          onPress={flipCamera}
          style={styles.smallButton}
        >
          <FlipIcon color="iconOnColor" />
        </Button>
        <Button
          radii="full"
          backgroundColor="overlay"
          onPress={goHome}
          style={styles.largeButton}
          mx="l"
        >
          <CancelIcon color="iconOnColor" />
        </Button>
        <Button
          radii="full"
          backgroundColor="overlay"
          onPress={goToSearch}
          style={styles.smallButton}
        >
          <SearchIcon color="iconOnColor" />
        </Button>
      </Box>

      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={isArmed ? onScan : undefined}
          style={StyleSheet.absoluteFillObject}
          type={cameraDirection}
        />
      )}
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boundingBox: {
    width: '100%',
    height: 342,
    position: 'relative',
    zIndex: 2,
  },
  tooltipArea: {
    width: '100%',
    height: 144,
    zIndex: 2,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionsArea: {
    width: '100%',
    height: 72,
    marginBottom: 72,
    zIndex: 2,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    opacity: 0.5,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeButton: {
    width: 72,
    height: 72,
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
