import { useCallback } from "react"
import { ACTIONS } from "../constants/actions.js"
import { App } from "antd"
import { useLogout } from "./useLogout.js"
import { useTranslation } from "react-i18next"

export const useResponseAction = () => {
  const { message: antdMessage } = App.useApp()
  const { t } = useTranslation()
  const { logout } = useLogout()
  const performAction = useCallback((action, message) => {
    switch (action) {
      case ACTIONS.LOGOUT:
        antdMessage.error(message || t('auth.errors.token_expires'))
        logout()
        break
      case ACTIONS.TOAST:
        antdMessage.error(message)
        break
      case ACTIONS.DIALOG:
        antdMessage.error(t('errors.internal'))
        break
    }
  }, [t])

  return {
    performAction
  }
}
