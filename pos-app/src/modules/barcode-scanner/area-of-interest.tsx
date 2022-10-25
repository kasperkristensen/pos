import { StyleSheet } from 'react-native'
import { Box } from '../common'

export const AreaOfInterest = () => {
  return (
    <Box style={styles.container}>
      <Box
        p="xs"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          backgroundColor="overlay"
          style={{
            opacity: 0.08,
            width: '100%',
            height: '100%',
          }}
        ></Box>
      </Box>
      <Box
        style={{
          ...styles.horizontal,
          top: 0,
          left: 0,
        }}
      />
      <Box
        style={{
          ...styles.horizontal,
          bottom: 0,
          left: 0,
        }}
      />
      <Box
        style={{
          ...styles.horizontal,
          top: 0,
          right: 0,
        }}
      />
      <Box
        style={{
          ...styles.horizontal,
          bottom: 0,
          right: 0,
        }}
      />
      <Box
        style={{
          ...styles.vertical,
          top: 0,
          left: 0,
        }}
      />
      <Box
        style={{
          ...styles.vertical,
          top: 0,
          right: 0,
        }}
      />
      <Box
        style={{
          ...styles.vertical,
          bottom: 0,
          left: 0,
        }}
      />
      <Box
        style={{
          ...styles.vertical,
          bottom: 0,
          right: 0,
        }}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  horizontal: {
    position: 'absolute',
    width: 24,
    height: 2,
    backgroundColor: 'white',
    zIndex: 1,
  },
  vertical: {
    position: 'absolute',
    width: 2,
    height: 24,
    backgroundColor: 'white',
    zIndex: 1,
  },
})
