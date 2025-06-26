import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFINED_LANGUAGES } from "../constants/languages.js";
import UserRequest from "../../api/user-request/UserRequest.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userMetadata, setUserMetadata] = useState({});
  const [isFetchingUserMetadata, setIsFetchingUserMetadata] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    localStorage.setItem('lang', lng);
    i18n.changeLanguage(lng);
    setUserMetadata((oldData) => {
      return {
        ...oldData,
        language: lng
      };
    });
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('lang') || DEFINED_LANGUAGES.VN;
    changeLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetchingUserMetadata(true);
      try {
        const data = await UserRequest.getData();
        setUserMetadata({
          ...data,
          language: i18n.language
        });
      } catch (e) {
        console.error('Error fetching user data: ', e);
      } finally {
        setIsFetchingUserMetadata(false);
      }
    };

    fetchData();
  }, []);

  const value = {
    userMetadata,
    changeLanguage,
    isFetchingUserMetadata
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
