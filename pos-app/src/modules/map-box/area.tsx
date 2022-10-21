import { StyleSheet } from 'react-native'
import MapView, { Region } from 'react-native-maps'
import { Box } from '../common'

type Props = {
  initialRegion: Region
}

const MapBox = () => {
  return (
    <Box
      style={{
        width: '100%',
        aspectRatio: 1 / 2.375,
      }}
    >
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 55.682305071965494,
          longitude: 12.578861,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </Box>
  )
}
