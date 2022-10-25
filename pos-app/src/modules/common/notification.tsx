import { useCallback, useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNotification } from '../../lib/contexts/notification-context'
import { CancelIcon, InfoIcon } from '../icons'
import { Box } from './box'
import { Text } from './text'

const FADE_IN_DURATION = 300
const FADE_OUT_DURATION = 150

export const Notification = () => {
  const { options, hideNotification } = useNotification()
  const insets = useSafeAreaInsets()

  const opacity = useRef(new Animated.Value(0)).current

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: FADE_IN_DURATION,
      useNativeDriver: true,
    }).start()
  }, [opacity])

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: FADE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      hideNotification()
    })
  }, [opacity, hideNotification])

  useEffect(() => {
    if (!options) {
      return
    }

    fadeIn()
    const timer = setTimeout(fadeOut, options.duration)

    return () => clearTimeout(timer)
  }, [options, fadeIn, fadeOut])

  if (!options) {
    return null
  }

  if (!options) {
    return null
  }

  const { content } = options

  const AnimatedBox = Animated.createAnimatedComponent(Box)

  return (
    <AnimatedBox px="l" style={[styles.view, { top: insets.top, opacity }]}>
      <Box radii="m" style={styles.container}>
        <Box style={styles.content} p="base">
          <InfoIcon color="iconPlaceholder" />
          <Box
            mx="base"
            style={{
              flex: 1,
            }}
          >
            {typeof content === 'string' ? (
              <Text color="textOnColor">{content}</Text>
            ) : (
              content
            )}
          </Box>
          <Pressable onPress={hideNotification}>
            <CancelIcon color="iconPlaceholder" />
          </Pressable>
        </Box>
        <Box style={styles.overlay} backgroundColor="overlay" />
      </Box>
    </AnimatedBox>
  )
}

const styles = StyleSheet.create({
  view: {
    alignSelf: 'center',
    width: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
  container: {
    width: '100%',
    position: 'relative',
    height: 80,
    overflow: 'hidden',
  },
  content: {
    zIndex: 2,
    opacity: 1,
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
