import { StyleSheet, Text, View } from 'react-native'

type Props = {
  hasPermission: boolean | null
}

export const PermissionMessage = ({ hasPermission }: Props) => {
  if (hasPermission) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {hasPermission === null
          ? 'No access to camera'
          : 'Requesting camera permission'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  text: {
    color: 'white',
  },
})
