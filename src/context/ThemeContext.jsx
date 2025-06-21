import { createContext, useContext, useState, useEffect } from 'react'
import { DEFINED_THEMES } from "../configs/themes";

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFINED_THEMES.LIGHT)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || DEFINED_THEMES.LIGHT
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const changeTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
