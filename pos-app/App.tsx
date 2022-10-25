import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import queryClient from './src/constants/query-client'
import ThemeProvider from './src/lib/contexts/theme-context'

import { useAppState } from './src/lib/hooks/use-app-state'
import useCachedResources from './src/lib/hooks/use-cached-ressources'
import useColorScheme from './src/lib/hooks/use-color-scheme'
import onAppStateChange from './src/lib/utils/on-app-state-change'
import Navigation from './src/navigation'

import { useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import 'expo-dev-client'
import { MedusaProvider } from 'medusa-react'
import { useEffect } from 'react'
import { BACKEND_URL } from './src/constants/api-client'
import NotificationProvider from './src/lib/contexts/notification-context'
import { Notification } from './src/modules/common/notification'

export default function App() {
  const { initialize } = useStripeTerminal()

  useEffect(() => {
    initialize()
  }, [initialize])

  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  useAppState(onAppStateChange)

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <MedusaProvider
          baseUrl={BACKEND_URL}
          queryClientProviderProps={{
            client: queryClient,
          }}
        >
          <ThemeProvider>
            <NotificationProvider>
              <Notification />
              <Navigation colorScheme={colorScheme} />
              <StatusBar style="dark" />
            </NotificationProvider>
          </ThemeProvider>
        </MedusaProvider>
      </SafeAreaProvider>
    )
  }
}
