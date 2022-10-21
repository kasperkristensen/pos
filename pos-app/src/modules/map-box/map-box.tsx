import { StyleSheet } from 'react-native'
import MapView, { Circle, Region } from 'react-native-maps'
import { useTheme } from '../../lib/contexts/theme-context'
import { Box } from '../common'

type Props = {
  region?: Region
  height?: number | string
  width?: number | string
}

export const MapBox = ({ region, width, height }: Props) => {
  const { theme } = useTheme()
  return (
    <Box
      radii="m"
      style={{
        width,
        height,
        overflow: 'hidden',
      }}
    >
      <MapView
        style={StyleSheet.absoluteFillObject}
        mapType="mutedStandard"
        zoomEnabled={false}
        scrollEnabled={false}
        region={{
          latitude: 55.682305071965494,
          longitude: 12.578861,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
      >
        <Circle
          center={{ latitude: 55.682305071965494, longitude: 12.578861 }}
          radius={24}
          strokeWidth={2}
          strokeColor="white"
          fillColor="rgba(96, 165, 250, 0.5)"
        />
      </MapView>
    </Box>
  )
}
