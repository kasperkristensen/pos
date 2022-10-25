import { Reader } from '@stripe/stripe-terminal-react-native'
import { StyleSheet } from 'react-native'
import { formatReader } from '../../../lib/utils/format-reader'
import { Box, Text } from '../../common'
import BatteryIndicator from '../battery-indicator'

type Props = {
  reader: Reader.Type
}

export const DiscoveredReader = ({ reader }: Props) => {
  return (
    <Box style={styles.container}>
      <Box>
        <Text variant="large">{formatReader(reader.deviceType)}</Text>
        <Text variant="small" color="textPlaceholder">
          S/N: {reader.serialNumber}
        </Text>
      </Box>
      <Box>
        <BatteryIndicator
          level={reader.batteryLevel}
          status={reader.batteryStatus}
        />
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  battery: {
    width: 25,
    height: 13,
  },
  positiveTerminal: {
    borderTopRightRadius: 9999,
    borderBottomRightRadius: 9999,
    width: 1.4,
    height: 4.22,
    marginLeft: 1,
  },
})
