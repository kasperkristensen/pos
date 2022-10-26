import { Reader, useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Box, Button, Divider, Text } from '../../modules/common'
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
    disconnectReader,
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

  const handleDisonnectReader = async () => {
    const result = await disconnectReader()

    if (result?.error) {
      console.log('disconnectReader error', result.error)
      return
    }

    console.log('Reader disconnected successfully')
  }

  return (
    <Box px="l" pt="xl" backgroundColor="background" style={styles.container}>
      <SafeAreaView>
        <Text variant="xlarge" weight="semibold">
          Connected terminal
        </Text>
        <Box mt="base">
          {connectedReader ? (
            <>
              <DiscoveredReader reader={connectedReader} />
              <Button
                backgroundColor="buttonSecondary"
                border="subtle"
                radii="m"
                mt="base"
                py="s"
                style={styles.button}
                onPress={handleDisonnectReader}
              >
                <Text variant="large" weight="semibold">
                  Disconnect
                </Text>
              </Button>
            </>
          ) : (
            <Text color="textPlaceholder">No connected terminal</Text>
          )}
        </Box>
      </SafeAreaView>
      <Box mt="l">
        <Divider width={'100%'} />
      </Box>
      <ScrollView>
        <Box mt="xl" mb="base">
          <Text variant="base" color="textPlaceholder">
            Available terminals
          </Text>
        </Box>
        {discoveredReaders.map((reader) => (
          <Button
            backgroundColor="background"
            key={reader.serialNumber}
            onPress={() => handleConnectBluetoothReader(reader)}
          >
            <DiscoveredReader reader={reader} />
          </Button>
        ))}
      </ScrollView>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ReaderSettings
