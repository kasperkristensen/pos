import { AppStateStatus, Platform } from 'react-native'
import { focusManager } from 'react-query'

const onAppStateChange = (status: AppStateStatus) => {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export default onAppStateChange
