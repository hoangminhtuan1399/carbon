import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { DEFINED_LANGUAGES } from "../constants/languages.js"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null)
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    localStorage.setItem('lang', lng)
    i18n.changeLanguage(lng)
  }

  const updateUserProfile = useCallback((profile) => {
    setUserProfile(profile)
  }, [])

  const removeUserProfile = useCallback(() => {
    setUserProfile(null)
  }, [])

  useEffect(() => {
    const savedLanguage = localStorage.getItem('lang') || DEFINED_LANGUAGES.VN
    changeLanguage(savedLanguage)
  }, [])

  const value = {
    changeLanguage,
    userProfile,
    updateUserProfile,
    removeUserProfile
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
