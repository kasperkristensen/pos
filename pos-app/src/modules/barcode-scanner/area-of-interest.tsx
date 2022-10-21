import { StyleSheet, View } from 'react-native'

export const AreaOfInterest = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.horizontal,
          top: 0,
          left: 0,
        }}
      />
      <View
        style={{
          ...styles.horizontal,
          bottom: 0,
          left: 0,
        }}
      />
      <View
        style={{
          ...styles.horizontal,
          top: 0,
          right: 0,
        }}
      />
      <View
        style={{
          ...styles.horizontal,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          ...styles.vertical,
          top: 0,
          left: 0,
        }}
      />
      <View
        style={{
          ...styles.vertical,
          top: 0,
          right: 0,
        }}
      />
      <View
        style={{
          ...styles.vertical,
          bottom: 0,
          left: 0,
        }}
      />
      <View
        style={{
          ...styles.vertical,
          bottom: 0,
          right: 0,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    opacity: 0.5,
    flex: 1,
  },
  horizontal: {
    position: 'absolute',
    width: 38,
    height: 4,
    backgroundColor: 'white',
  },
  vertical: {
    position: 'absolute',
    width: 4,
    height: 38,
    backgroundColor: 'white',
  },
})
