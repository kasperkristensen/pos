import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { themeColors } from '../../constants/Colors'
import { useTheme } from '../../lib/contexts/theme-context'
import BarcodeScanner from '../../modules/barcode-scanner'
import { Box } from '../../modules/common'
import { SearchInput } from '../../modules/common/search-input'
import { DismissKeyboardView } from '../../modules/helpers'
import SearchResults from '../../modules/search-results'

import { BottomScreenProps } from '../../types'

export default function SearchScreen({
  navigation,
}: BottomScreenProps<'Search'>) {
  const { theme } = useTheme()
  const isFocussed = useIsFocused()
  const [useScanner, setUseScanner] = useState(false)
  const [query, setQuery] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!isFocussed) {
      setUseScanner(false)
    }
  }, [isFocussed])

  const toggleScanner = () => {
    setUseScanner(!useScanner)
  }

  return (
    <DismissKeyboardView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Box
          px="l"
          pb="base"
          style={{
            width: '100%',
          }}
        >
          <SearchInput
            placeholder="Search"
            query={query}
            setQuery={setQuery}
            useScanner={useScanner}
            toggleScanner={toggleScanner}
          />
        </Box>
      </SafeAreaView>
      <Box
        style={{
          flex: 1,
        }}
      >
        {useScanner ? (
          <Box style={StyleSheet.absoluteFill}>
            {isFocussed && <BarcodeScanner onBarcodeScanned={() => {}} />}
          </Box>
        ) : (
          <SearchResults query={query} />
        )}
      </Box>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background.background,
  },
  safeArea: {
    paddingTop: StatusBar.currentHeight,
  },
})
