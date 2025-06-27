import BaseApi from "../base/BaseApi.js"

class AuthApi extends BaseApi {
  static async checkNationalId({ national_id, language }) {
    try {
      const response = await this.instance.post('/auth/cknid', {
        national_id,
        device_id: this.deviceId,
        language
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  static async login({ national_id, language, access_code, password }) {
    try {
      const response = await this.instance.post('/auth/login', {
        national_id,
        device_id: this.deviceId,
        language,
        access_code,
        password
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

AuthApi.init()

export default AuthApi
