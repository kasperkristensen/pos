import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native'
import App from './App'
import { connectionToken } from './src/lib/api/payments/connection-token'

export default function Root() {
  return (
    <StripeTerminalProvider logLevel="verbose" tokenProvider={connectionToken}>
      <App />
    </StripeTerminalProvider>
  )
}
