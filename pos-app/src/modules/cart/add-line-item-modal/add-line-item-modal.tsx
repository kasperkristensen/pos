import { StyleSheet } from 'react-native'
import { Box, Button, Text } from '../../common'

type Props = {}

export const AddLineItemModal = () => {
  return (
    <Box style={styles.container}>
      <Text variant="large" weight="semibold">
        Adding to bag
      </Text>
      <Button backgroundColor="buttonSecondary" py="base">
        <Text>Close</Text>
      </Button>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 412,
    width: '100%',
    bottom: 0,
  },
})
