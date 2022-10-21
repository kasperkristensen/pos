import { StyleSheet, View } from 'react-native'
import { themeColors } from '../../constants/Colors'

type Props = {
  setPins: number
}

export const Pins = ({ setPins }: Props) => {
  return (
    <View style={styles.container}>
      {Array.from(Array(4).keys()).map((i) => (
        <View
          key={i}
          style={{
            ...styles.pin,
            backgroundColor:
              i < setPins
                ? themeColors.background.backgroundInverse
                : 'transparent',
            borderColor:
              i < setPins
                ? themeColors.background.backgroundInverse
                : themeColors.border.borderSubtle,
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 128,
    width: 128,
  },
  pin: {
    width: 16,
    height: 16,
    borderRadius: 9999,
    borderWidth: 1,
  },
})
