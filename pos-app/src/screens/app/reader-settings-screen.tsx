import { useIsFocused } from '@react-navigation/native'
import { Reader, useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import { useEffect, useState } from 'react'
import {
  Alert,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { useNotification } from '../../lib/contexts/notification-context'
import { Box, Text } from '../../modules/common'
import { BackIcon } from '../../modules/icons'
import { DiscoveredReader } from '../../modules/readers'
import { ActionScreenProps } from '../../types'

const LOCATION_ID = process.env.LOCATION_ID

const ReaderSettings = ({
  navigation,
}: ActionScreenProps<'ReaderSettings'>) => {
  const isFocused = useIsFocused()
  const [discovering, setDiscovering] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const {
    discoveredReaders,
    connectedReader,
    discoverReaders,
    connectBluetoothReader,
    cancelDiscovering,
    disconnectReader,
    isInitialized,
  } = useStripeTerminal()

  useEffect(() => {
    if (!isInitialized) {
      return
    }

    const init = async () => {
      if (isFocused) {
        await handleDiscoverReaders()
      } else {
        await cancelDiscovering()
      }
    }

    init()

    return () => {
      cancelDiscovering()
    }
  }, [isFocused, isInitialized])

  const handleDiscoverReaders = async () => {
    if (discovering) {
      return
    }

    setDiscovering(true)

    // The list of discovered readers is reported in the `didUpdateDiscoveredReaders` method
    // within the `useStripeTerminal` hook.
    const { error } = await discoverReaders({
      discoveryMethod: 'bluetoothScan',
    })

    if (error) {
      showNotification({
        content: error.message,
        duration: 3000,
      })
    }

    const timeout = setTimeout(() => {
      cancelDiscovering()
      setDiscovering(false)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }

  const handleDisconnectReader = async () => {
    const result = await disconnectReader()

    if (result?.error) {
      Alert.alert(
        'Disconnect reader error: ',
        `${result.error.code}, ${result.error.message}`
      )
    }
  }

  const handleConnectBluetoothReader = async (selectedReader: Reader.Type) => {
    const { reader, error } = await connectBluetoothReader({
      reader: selectedReader,
      locationId: LOCATION_ID,
    })

    if (error) {
      console.log('connectBluetoothReader error', error)
      return
    }

    console.log('Reader connected successfully', reader)
  }

  return (
    <Box style={styles.container} backgroundColor="layer" px="l">
      <SafeAreaView>
        <Box mt="base">
          <Pressable>
            <BackIcon color="iconPlaceholder" />
          </Pressable>
        </Box>
        <Box>
          {connectedReader && <DiscoveredReader reader={connectedReader} />}
        </Box>
      </SafeAreaView>
      <Box style={styles.discoverArea}>
        <Text variant="large">Available terminals</Text>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={discovering}
              onRefresh={handleDiscoverReaders}
            />
          }
        >
          {discoveredReaders.map((reader) => (
            <Box key={reader.serialNumber} py="base">
              <Pressable onPress={() => handleConnectBluetoothReader(reader)}>
                <DiscoveredReader reader={reader} />
              </Pressable>
            </Box>
          ))}
        </ScrollView>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  discoverArea: {
    flex: 1,
  },
})

export default ReaderSettings
