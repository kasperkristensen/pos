import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { useStore } from '../../../lib/contexts/store-context'
import { Box, Button, Text } from '../../common'

const FADE_IN_DURATION = 300
const FADE_OUT_DURATION = 150

export const AddLineItemModal = () => {
  const { addLineItemState, clearAddLineItemState } = useStore()
  const { navigate } = useNavigation()

  const opacity = useRef(new Animated.Value(0)).current
  const position = useRef(new Animated.Value(412)).current

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0.9,
      duration: FADE_IN_DURATION,
      useNativeDriver: true,
    }).start()
  }, [opacity])

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: FADE_OUT_DURATION,
      useNativeDriver: true,
    }).start()
  }, [opacity])

  const slideUp = useCallback(() => {
    Animated.timing(position, {
      toValue: 0,
      duration: FADE_IN_DURATION,
      useNativeDriver: true,
    }).start()
  }, [position])

  const slideDown = useCallback(() => {
    Animated.timing(position, {
      toValue: 412,
      duration: FADE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      clearAddLineItemState()
    })
  }, [position, clearAddLineItemState])

  const runEnterAnimations = useCallback(() => {
    fadeIn()
    slideUp()
  }, [])

  const runExitAnimations = useCallback(() => {
    fadeOut()
    slideDown()
  }, [])

  useEffect(() => {
    if (!addLineItemState) {
      return
    }

    runEnterAnimations()
  }, [addLineItemState, fadeIn])

  const goToCart = () => {
    runExitAnimations()
    navigate('Root', {
      screen: 'Bottom',
      params: {
        screen: 'Cart',
      },
    })
  }

  if (!addLineItemState) {
    return null
  }

  const AnimatedBox = Animated.createAnimatedComponent(Box)

  return (
    <Box
      style={StyleSheet.flatten([
        StyleSheet.absoluteFillObject,
        styles.container,
      ])}
      backgroundColor="transparent"
    >
      <AnimatedBox
        style={[styles.overlay, { opacity: opacity }]}
        backgroundColor="backgroundInverse"
      />
      <AnimatedBox
        px="l"
        style={[styles.modal, { transform: [{ translateY: position }] }]}
        backgroundColor="background"
        radii="xl"
      >
        <Box style={styles.status}>
          <Text variant="large" weight="semibold">
            {addLineItemState.status === 'loading'
              ? 'Adding to bag'
              : addLineItemState.status === 'success'
              ? 'Added to bag'
              : 'Error'}
          </Text>
          {addLineItemState.status === 'success' && (
            <Text variant="large" color="textSecondary">
              ({addLineItemState.itemCount}{' '}
              {addLineItemState.itemCount > 1 ? 'items' : 'item'} total)
            </Text>
          )}
        </Box>
        {addLineItemState.status === 'loading' ? (
          <Button
            backgroundColor="buttonSecondary"
            border="subtle"
            radii="m"
            py="base"
            style={styles.button}
          >
            <Text variant="large">Close</Text>
          </Button>
        ) : addLineItemState.status === 'success' ? (
          <Box>
            <Button
              backgroundColor="buttonPrimary"
              radii="m"
              py="base"
              mb="s"
              style={styles.button}
              onPress={goToCart}
            >
              <Text variant="large" color="textOnColor">
                View bag
              </Text>
            </Button>
            <Button
              backgroundColor="buttonSecondary"
              border="subtle"
              radii="m"
              py="base"
              style={styles.button}
            >
              <Text variant="large">Close</Text>
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              backgroundColor="buttonSecondary"
              border="subtle"
              radii="m"
              py="base"
              style={styles.button}
            >
              <Text variant="large">Close</Text>
            </Button>
            <Button
              backgroundColor="buttonSecondary"
              border="subtle"
              radii="m"
              py="base"
              style={styles.button}
            >
              <Text variant="large">Close</Text>
            </Button>
          </Box>
        )}
      </AnimatedBox>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  status: {
    alignItems: 'center',
  },
  modal: {
    height: 412,
    width: '100%',
    paddingTop: 40,
    paddingBottom: 56,
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
