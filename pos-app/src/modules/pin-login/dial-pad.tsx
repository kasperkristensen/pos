import { StyleSheet, View } from 'react-native'
import { BackspaceDial, NumberDial } from './dials'

type Props = {
  onNumberPress: (number: number) => void
  onBackspacePress: () => void
}

export const DialPad = ({ onNumberPress, onBackspacePress }: Props) => {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1)

  return (
    <View style={styles.container}>
      <View style={styles.pad}>
        {[0, 1, 2].map((row) => {
          return (
            <View style={styles.row} key={row}>
              {numbers.slice(row * 3, row * 3 + 3).map((number) => (
                <NumberDial
                  key={number}
                  number={number}
                  gap={number !== row * 3 ? 16 : undefined}
                  onPress={onNumberPress}
                />
              ))}
            </View>
          )
        })}
        <View style={styles.lastRow}>
          <NumberDial number={0} onPress={onNumberPress} />
          <BackspaceDial onBackspace={onBackspacePress} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pad: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 288,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 16,
  },
  lastRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
})
