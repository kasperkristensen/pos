import { KeyboardAvoidingView } from 'react-native'
import { useTheme } from '../../lib/contexts/theme-context'
import { Box, Text } from '../common'
import { Tab } from './tab'

type Props = {
  query?: string
}

export const SearchResults = ({ query }: Props) => {
  const { theme } = useTheme()

  return (
    <Box px="l">
      <Box
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <Tab title="Product" count={0} />
        <Tab title="Orders" count={0} />
        <Tab title="Customers" count={0} />
      </Box>
      <KeyboardAvoidingView
        behavior="height"
        style={{
          marginVertical: 16,
          backgroundColor: 'red',
          height: '100%',
        }}
      >
        <Box>
          <Text variant="large" color="textPrimary">
            No results
          </Text>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  )
}
