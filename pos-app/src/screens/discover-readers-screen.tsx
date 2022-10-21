import { useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import { useEffect } from 'react'
import { Alert, Text, View } from 'react-native'
import { RootTabScreenProps } from '../types'

const DiscoverReadersScreen = ({ navigation }: RootTabScreenProps<'User'>) => {
  const { discoverReaders, discoveredReaders, connectBluetoothReader } =
    useStripeTerminal()

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

  return (
    <View>
      {discoveredReaders.map((reader) => (
        <View key={reader.id}>
          <Text>{reader.id}</Text>
        </View>
      ))}
    </View>
  )
}

export default DiscoverReadersScreen
