import { ScrollView, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../lib/contexts/theme-context'
import { Box } from '../../modules/common'
import { LogoIcon } from '../../modules/icons/logo-icon'

import { AuthenticationStackScreenProps } from '../../types'

export default function InitialAuthScreen({
  navigation,
}: AuthenticationStackScreenProps<'InitialAuth'>) {
  const { theme } = useTheme()

  return (
    <SafeAreaView style={style.container} edges={['top', 'left', 'right']}>
      <ScrollView
        style={style.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mb="base"
          backgroundColor="background"
        >
          <LogoIcon size={48} />
        </Box>
        <Box
          backgroundColor="primary"
          radii="m"
          mt="l"
          style={{
            width: '100%',
            aspectRatio: 1 / 1,
          }}
        />
        <Box
          backgroundColor="primary"
          radii="m"
          mt="l"
          style={{
            width: '100%',
            aspectRatio: 1 / 1,
          }}
        />
        <Box
          backgroundColor="primary"
          radii="m"
          mt="l"
          mb="xxxl"
          style={{
            width: '100%',
            aspectRatio: 1 / 1,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    paddingTop: (StatusBar.currentHeight || 0) + 16,
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
})
