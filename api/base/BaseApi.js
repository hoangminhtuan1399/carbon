import axios from "axios";
import PrepareRequest from "../prepare-request/PrepareRequest.js"

class BaseApi {
  static _initialized = false
  static async init() {
    if (this._initialized) return
    this.instance = axios.create({
      baseURL: 'https://api.tinchicarbon.com/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    await this.setupInterceptors()
    this._initialized = true
  }

  static async setupInterceptors() {
    const data = await PrepareRequest.getData()
    this.instance.interceptors.request.use(
      (config) => {
        config.headers = {
          ...config.headers,
          'the-timezone-iana': data.timezone,
          'x-forwarded-for': data.ipAddress,
          'x-app-version': data.appVersion,
          'x-location-info': data.locationInfo
        };
        return config;
      },
      (error) => Promise.reject(error)
    )
    this.deviceId = data.deviceId
  }

  static handleError(error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message
    }
    return error
  }
}

export default BaseApi
