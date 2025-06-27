import { removeAccessToken } from "../../utils/access-token.js"

export const logoutLoader = () => {
  removeAccessToken()
}
