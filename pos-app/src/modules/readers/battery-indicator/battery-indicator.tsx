import { Reader } from '@stripe/stripe-terminal-react-native'
import { StyleSheet } from 'react-native'
import { Theme } from '../../../constants/theme'
import { Box } from '../../common'
import { ZapIcon } from '../../icons'

type Props = {
  status: Reader.BatteryStatus
  level?: number
  isCharging?: boolean
}

export const BatteryIndicator = ({ status, level, isCharging }: Props) => {
  return (
    <Box
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Box style={styles.battery} border="subtle" radii="s" p="px">
        <Box
          radii="xs"
          backgroundColor={getStatus(status)}
          style={{
            width: getCharge(level) || '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {true && (
            <Box
              style={{
                left: '50%',
                top: '50%',
                transform: [{ translateX: 50 }, { translateY: 50 }],
              }}
            >
              <ZapIcon size={13} />
            </Box>
          )}
        </Box>
      </Box>
      <Box style={styles.positiveTerminal} backgroundColor="subtle" />
    </Box>
  )
}

const getStatus = (status: Reader.BatteryStatus): keyof Theme['colors'] => {
  switch (status) {
    case 'critical':
      return 'supportError'
    case 'low':
      return 'supportWarning'
    case 'nominal':
      return 'supportSuccess'
    case 'unknown':
      return 'subtle'
  }
}

export const getCharge = (level?: number) => {
  if (!level) {
    return 0
  }

  return (level * 100).toFixed(0) + '%'
}

const styles = StyleSheet.create({
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
