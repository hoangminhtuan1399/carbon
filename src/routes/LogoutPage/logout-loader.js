import { removeAccessToken } from "../../utils/access-token.js"
import { redirect } from 'react-router'

export const logoutLoader = () => {
  removeAccessToken()
  redirect('/auth')
}
