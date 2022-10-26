import { createContext, useContext, useState } from 'react'

type Props = {
  children?: React.ReactNode
}

type Options = {
  content: string | React.ReactNode
  duration?: number | typeof Infinity
}

type NotificationContextType = {
  showNotification: (options: Options) => void
  hideNotification: () => void
  options: Options | null
}

const NotificationContext = createContext<NotificationContextType | null>(null)

const NotificationProvider = ({ children }: Props) => {
  const [options, setOptions] = useState<Options | null>(null)

  const showNotification = ({ content, duration = 3000 }: Options) => {
    setOptions({ content, duration })
  }

  const hideNotification = () => {
    setOptions(null)
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
        options,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider

export const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }

  return context
}
