import { createContext, useContext, useState } from 'react'
import { darkTheme, theme, Theme } from '../../constants/theme'
import useColorScheme from '../hooks/use-color-scheme'

type ThemeContext = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContext | null>(null)

const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const systemTheme = useColorScheme()
  const [darkMode, setDarkmode] = useState(systemTheme === 'dark')

  const toggleTheme = () => {
    setDarkmode(!darkMode)
  }

  return (
    <ThemeContext.Provider
      value={{ theme: darkMode ? darkTheme : theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export default ThemeProvider
