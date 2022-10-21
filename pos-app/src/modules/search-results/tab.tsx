import { Pressable } from 'react-native'
import { Box, Text } from '../common'

type TabProps = {
  title: string
  count?: number
}

export const Tab = ({ title, count }: TabProps) => {
  return (
    <Pressable
      style={{
        width: '33.33%',
      }}
    >
      <Box
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          variant="large"
          style={{
            fontWeight: '600',
          }}
        >
          {title}
        </Text>
        <Text>{count || 0}</Text>
      </Box>
    </Pressable>
  )
}
