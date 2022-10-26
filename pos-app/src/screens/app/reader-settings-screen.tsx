import { Reader, useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import { useEffect } from 'react'
import { Pressable, SafeAreaView, StyleSheet } from 'react-native'
import { Box } from '../../modules/common'
import { DiscoveredReader } from '../../modules/readers'
import { ActionScreenProps } from '../../types'

const LOCATION_ID = process.env.LOCATION_ID

const ReaderSettings = ({
  navigation,
}: ActionScreenProps<'ReaderSettings'>) => {
  const {
    connectedReader,
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

    // if (error) {
    //   Alert.alert('Discover readers error: ', `${error.code}, ${error.message}`)
    // }
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
    <Box px="l">
      <SafeAreaView>
        <Box>
          {connectedReader && <DiscoveredReader reader={connectedReader} />}
        </Box>
      </SafeAreaView>
      {discoveredReaders.map((reader) => (
        <Pressable
          key={reader.serialNumber}
          onPress={() => handleConnectBluetoothReader(reader)}
        >
          <DiscoveredReader reader={reader} />
        </Pressable>
      ))}
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
