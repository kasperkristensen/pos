import { StyleSheet } from 'react-native'
import { Box, Button, Divider, Text } from '../../modules/common'
import { ActionScreenProps } from '../../types'

export default function OrderConfirmedScreen({
  navigation,
  route: {
    params: { order },
  },
}: ActionScreenProps<'OrderConfirmed'>) {
  const { navigate } = navigation

  const handleClose = () => {
    navigate('Bottom', {
      screen: 'Home',
    })
  }

  return (
    <Box px="l" pt="xxxl" backgroundColor="background" style={styles.container}>
      <Box>
        <Box mb="base">
          <Text variant="xxlarge">Order confirmed</Text>
        </Box>
        <Divider width={32} />
        <Box mt="xl" mb="l">
          <Text variant="large">Order number</Text>
          <Text variant="large" color="textSecondary">
            {order.id}
          </Text>
        </Box>
        <Box>
          <Text variant="large">Order date</Text>
          <Text variant="large" color="textSecondary">
            {new Date(order.created_at).toLocaleString('en-US')}
          </Text>
        </Box>
      </Box>
      <Box>
        <Button
          backgroundColor="layer"
          border="subtle"
          py="base"
          style={styles.button}
          radii="m"
        >
          <Text variant="large" weight="semibold" color="textPrimary">
            Resend receipt
          </Text>
        </Button>
        <Button
          my="s"
          backgroundColor="layer"
          border="subtle"
          py="base"
          style={styles.button}
          radii="m"
        >
          <Text variant="large" weight="semibold" color="textPrimary">
            Print invoice
          </Text>
        </Button>
        <Button
          backgroundColor="buttonSecondary"
          border="subtle"
          py="base"
          style={styles.button}
          radii="m"
          onPress={handleClose}
        >
          <Text variant="large" weight="semibold" color="textPrimary">
            Close
          </Text>
        </Button>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 64,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
