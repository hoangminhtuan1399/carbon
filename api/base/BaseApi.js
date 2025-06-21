import axios from "axios";

class BaseApi {
  static init() {
    this.instance = axios.create({
      baseURL: 'https://api.tinchicarbon.com/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  static handleError(error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return error;
  }
}

export default BaseApi
