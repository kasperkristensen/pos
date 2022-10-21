import { useTheme } from '../../lib/contexts/theme-context'
import { Box, Text } from '../../modules/common'

import { AuthenticationStackScreenProps } from '../../types'

export default function PinAuthScreen({
  navigation,
}: AuthenticationStackScreenProps<'PinAuth'>) {
  const { theme } = useTheme()

  return (
    <Box>
      <Text variant="base" color="textPrimary">
        Initial
      </Text>
    </Box>
  )
}
