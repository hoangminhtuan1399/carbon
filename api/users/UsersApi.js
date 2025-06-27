import BaseApi from "../base/BaseApi.js"
import { checkAccessToken } from "../../src/utils/access-token.js"

class UsersApi extends BaseApi {
  static async init() {
    await super.init()
    this._setUpJwtToken()
  }

  static _setUpJwtToken() {
    this.instance.interceptors.request.use((config) => {
      const accessToken = checkAccessToken()
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    })
  }

  static async getUsers({ language }) {
    try {
      const response = await this.instance.get('/users', {
        headers: {
          'accept-language': language
        }
      })
      return response.data
    } catch (e) {
      throw this.handleError(e)
    }
  }
}

UsersApi.init()

export default UsersApi
