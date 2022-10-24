import { Reader, useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import { useEffect } from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import { RootTabScreenProps } from '../types'

const DiscoverReadersScreen = ({
  navigation,
}: RootTabScreenProps<'DiscoverReader'>) => {
  const {
    discoverReaders,
    discoveredReaders,
    connectBluetoothReader,
    cancelDiscovering,
  } = useStripeTerminal()

  useEffect(() => {
    handleDiscoverReaders()
  }, [])

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

  const handleConnectBluetoothReader = async (selectedReader: Reader.Type) => {
    const { reader, error } = await connectBluetoothReader({
      reader: selectedReader,
      locationId: 'loc_test',
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
      {discoveredReaders.map((reader) => (
        <View
          key={reader.serialNumber}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 12,
          }}
        >
          <Pressable onPress={() => handleConnectBluetoothReader(reader)}>
            <Text>{reader.deviceType}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  )
}

export default DiscoverReadersScreen
