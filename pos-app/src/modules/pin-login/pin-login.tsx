import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, Vibration, View } from 'react-native'
import { themeColors } from '../../constants/Colors'
import { Divider } from '../common'
import { DialPad } from './dial-pad'
import { Pins } from './pins'

export const PinLogin = () => {
  const [pins, setPins] = useState<number[]>([])
  const [error, setError] = useState(false)

  const onNumberPress = (number: number) => {
    if (error) {
      setError(false)
    }

    if (pins.length < 4) {
      setPins([...pins, number])
    }
  }

  const onBackspacePress = () => {
    if (pins.length > 0) {
      setPins(pins.slice(0, -1))
    }
  }

  const anim = useRef(new Animated.Value(0))

  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim.current, {
          toValue: -8,
          duration: 50,
          useNativeDriver: true,
        }),
        // shift element to the right by 2 units
        Animated.timing(anim.current, {
          toValue: 8,
          duration: 50,
          useNativeDriver: true,
        }),
        // bring the element back to its original position
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 2 }
    ).start()
  }, [])

  useEffect(() => {
    if (pins.length === 4) {
      Vibration.vibrate([20, 10, 30])
      shake()
      setError(true)
      setTimeout(() => {
        setPins([])
      }, 350)
    }
  }, [pins])

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 24,
        }}
      >
        {error && (
          <Text
            style={{
              color: themeColors.button.buttonDanger,
              fontSize: 14,
              lineHeight: 24,
            }}
          >
            Error text
          </Text>
        )}
      </View>
      <Text style={styles.header}>PIN Login</Text>
      <Divider width={32} mt="m" mb="xl" />
      <Animated.View style={{ transform: [{ translateX: anim.current }] }}>
        <Pins setPins={pins.length} />
      </Animated.View>
      <View style={styles.dialContainer}>
        <DialPad
          onNumberPress={onNumberPress}
          onBackspacePress={onBackspacePress}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontWeight: '400',
    fontSize: 30,
    lineHeight: 48,
    color: themeColors.text.textPrimary,
  },
  divider: {
    width: 32,
    height: 1,
    backgroundColor: themeColors.border.borderSubtle,
    marginTop: 16,
    marginBottom: 32,
  },
  dialContainer: {
    marginTop: 72,
  },
})
