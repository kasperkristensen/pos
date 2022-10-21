import { useTheme } from '../../lib/contexts/theme-context'
import { Box, Text } from '../../modules/common'

import { AuthenticationStackScreenProps } from '../../types'

export default function EmailAuthScreen({
  navigation,
}: AuthenticationStackScreenProps<'EmailAuth'>) {
  const { theme } = useTheme()

  return (
    <Box>
      <Text variant="base" color="textPrimary">
        Email
      </Text>
    </Box>
  )
}
