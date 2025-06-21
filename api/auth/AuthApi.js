import BaseApi from "../base/BaseApi.js";

class AuthApi extends BaseApi {
  static init() {
    super.init();
    this.setupInterceptors();
  }

  static setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        config.headers = { //TODO Create function to get the user data
          ...config.headers,
          'the-timezone-iana': '',
          'x-device-id': '',
          'x-forwarded-for': '',
          'x-app-version': '1.0',
          'accept-language': '',
          'x-location-info': ''
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  static async checkNationalId(nationalId) {
    try {
      const response = await this.instance.post('/auth/cknid', { nationalId });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async login() {

  }

  static async forgotPassword() {

  }

  static logout() {

  }
}

AuthApi.init();

export default AuthApi;
