import BaseApi from "../base/BaseApi.js";

class AuthApi extends BaseApi {
  static _initialized = false;

  static init(userMetadata) {
    if (!this._initialized) {
      super.init();
    }
    this.setupInterceptors(userMetadata);
    this._initialized = true;
  }

  static setupInterceptors(userMetadata) {
    this.instance.interceptors.request.use(
      (config) => {
        config.headers = {
          ...config.headers,
          'the-timezone-iana': userMetadata.timezone,
          'x-device-id': userMetadata.deviceId,
          'x-forwarded-for': userMetadata.ipAddress,
          'x-app-version': userMetadata.appVersion,
          'accept-language': userMetadata.language,
          'x-location-info': userMetadata.locationInfo
        };
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  static async checkNationalId({ national_id, device_id, language }) {
    try {
      const response = await this.instance.post('/auth/cknid', {
        national_id,
        device_id,
        language
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async login({ national_id, device_id, language, access_code, password }) {
    try {
      const response = await this.instance.post('/auth/login', {
        national_id,
        device_id,
        language,
        access_code,
        password
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async forgotPassword() {

  }

  static logout() {

  }
}

export default AuthApi;
