import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFINED_LANGUAGES } from "../constants/languages.js";
import UserRequest from "../../api/user-request/UserRequest.js";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userMetadata, setUserMetadata] = useState({})
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    localStorage.setItem('lang', lng);
    i18n.changeLanguage(lng);
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem('lang') || DEFINED_LANGUAGES.VN
    changeLanguage(savedLanguage)
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await UserRequest.getData();
      setUserMetadata({
        ...data,
        language: i18n.language
      })
    }

    fetchData()
  }, []);

  return (
    <UserContext.Provider value={{ userMetadata, changeLanguage }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
