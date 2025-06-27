import UsersApi from "../../../api/users/UsersApi.js"
import i18n from "i18next"
import { DEFINED_LANGUAGES } from "../../constants/languages.js"

export const usersLoader = async () => {
  try {
    const language = i18n.language || DEFINED_LANGUAGES.VN
    const response = await UsersApi.getUsers({ language })
    return {
      ...response,
      success: true
    }
  } catch (e) {
    return {
      ...e,
      success: false
    }
  }
}
