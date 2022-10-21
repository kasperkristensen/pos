import { Box, Text } from '../../modules/common'
import MapBox from '../../modules/map-box'
import { OpenStatus } from '../../modules/store/store-description/open-status'

export const StoreScreen = () => {
  const closesAt = new Date()
  const opensAt = new Date()

  closesAt.setHours(16, 0, 0, 0)
  opensAt.setHours(8, 0, 0, 0)

  return (
    <Box>
      <Box mb="base">
        <Text variant="xxlarge">Flagship Store</Text>
        <Text variant="large" color="textPlaceholder">
          Vognmagergade 6, Copenhagen
        </Text>
      </Box>
      <Box mb="xl">
        <OpenStatus closes_at={closesAt} opens_at={opensAt} />
      </Box>
      <MapBox width={'100%'} height={144} />
    </Box>
  )
}
