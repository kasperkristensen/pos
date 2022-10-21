import {
  Pressable,
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
} from 'react-native'
import { themeColors } from '../../constants/Colors'
import { BackspaceIcon } from '../icons'

type DialProps = {
  style?: StyleProp<StyleSheetProperties>
}

type NumberDialProps = DialProps & {
  gap?: number
  number: number
  onPress: (number: number) => void
}

export const NumberDial = ({ number, onPress, gap = 0 }: NumberDialProps) => {
  return (
    <Pressable
      onPress={() => onPress(number)}
      style={{
        ...styles.base,
        ...styles.numberDial,
        marginLeft: gap,
      }}
    >
      <Text style={styles.text}>{number}</Text>
    </Pressable>
  )
}

type BackspaceDialProps = DialProps & {
  onBackspace: () => void
}

export const BackspaceDial = ({ onBackspace, style }: BackspaceDialProps) => {
  return (
    <Pressable
      onPress={() => onBackspace()}
      style={{
        ...styles.base,
        ...styles.backspaceDial,
      }}
    >
      <BackspaceIcon />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 9999,
    padding: 16,
    borderWidth: 1,
    borderColor: themeColors.border.borderSubtle,
  },
  text: {
    fontSize: 30,
    lineHeight: 48,
  },
  numberDial: {
    backgroundColor: themeColors.layer.layer01,
  },
  backspaceDial: {
    backgroundColor: themeColors.background.background,
    borderWidth: 1,
    borderColor: themeColors.border.borderSubtle,
    marginLeft: 16,
  },
})
