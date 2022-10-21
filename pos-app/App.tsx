import { QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import queryClient from './src/constants/query-client'
import ThemeProvider from './src/lib/contexts/theme-context'

import { useAppState } from './src/lib/hooks/use-app-state'
import useCachedResources from './src/lib/hooks/use-cached-ressources'
import useColorScheme from './src/lib/hooks/use-color-scheme'
import onAppStateChange from './src/lib/utils/on-app-state-change'
import Navigation from './src/navigation'

import 'expo-dev-client'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  useAppState(onAppStateChange)

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar style="dark" />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    )
  }
}
