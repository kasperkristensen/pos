import { useIsFocused } from '@react-navigation/native'
import { Reader, useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import { useEffect } from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import { DiscoveredReader } from '../modules/readers'
import { RootTabScreenProps } from '../types'

const LOCATION_ID = process.env.LOCATION_ID

const DiscoverReadersScreen = ({
  navigation,
}: RootTabScreenProps<'DiscoverReader'>) => {
  const isFocused = useIsFocused()

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

    if (connectedReader) {
      return
    }

    if (isFocused) {
      handleDiscoverReaders()
    } else {
      cancelDiscovering()
    }
  }, [isFocused, isInitialized])

  const handleDiscoverReaders = async () => {
    // The list of discovered readers is reported in the `didUpdateDiscoveredReaders` method
    // within the `useStripeTerminal` hook.
    const { error } = await discoverReaders({
      discoveryMethod: 'bluetoothScan',
    })

    if (error) {
      Alert.alert('Discover readers error: ', `${error.code}, ${error.message}`)
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

  useEffect(() => {
    console.log(JSON.stringify(discoveredReaders, null, 2))
  }, [discoveredReaders])

  return (
    <View>
      {connectedReader && (
        <View>
          <Text>{connectedReader.deviceType}</Text>
          <Text>{((connectedReader.batteryLevel || 0) * 100).toFixed(0)}%</Text>
          <Pressable onPress={handleDisconnectReader}>
            <Text>Disconnect</Text>
          </Pressable>
        </View>
      )}
      {discoveredReaders.map((reader) => (
        <View
          key={reader.serialNumber}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 12,
          }}
        >
          <Pressable onPress={() => handleConnectBluetoothReader(reader)}>
            <DiscoveredReader reader={reader} />
          </Pressable>
        </View>
      ))}
    </View>
  )
}

export default DiscoverReadersScreen
