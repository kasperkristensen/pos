import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Box, Text } from '../../common'

type Props = {
  closes_at: Date
  opens_at: Date
} & React.ComponentProps<typeof Box>

export const OpenStatus = ({ closes_at, opens_at, style, ...rest }: Props) => {
  const openStatus = useMemo(() => {
    const now = new Date().getTime()
    const open = now > opens_at.getTime() && now < closes_at.getTime()

    return open ? 'Open' : 'Closed'
  }, [closes_at, opens_at])

  return (
    <Box
      radii="full"
      backgroundColor="background"
      px="m"
      py="xxs"
      style={StyleSheet.flatten([styles.container, style])}
      {...rest}
    >
      <Box
        radii="full"
        backgroundColor={openStatus ? 'supportSuccess' : 'supportError'}
        style={styles.dot}
      />
      <Text
        style={{
          marginLeft: 8,
        }}
      >
        2 hours until closing
      </Text>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  dot: {
    width: 8,
    height: 8,
  },
})
