import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs'

class UserRequest {
  static async getData() {
    const result = {
      timezone: '',
      deviceId: '',
      ipAddress: '',
      appVersion: import.meta.env.VITE_APP_VERSION,
      locationInfo: ''
    }

    const [ipGeolocation, deviceId] = await Promise.all([this._getIpGeolocation(), this._getDeviceId()]);
    if (ipGeolocation) {
      result.timezone = ipGeolocation.timezone;
      result.ipAddress = ipGeolocation.query;
      result.locationInfo = `lat=${ipGeolocation.lat};lon=${ipGeolocation.lon};country=${ipGeolocation.country};city=${ipGeolocation.city}`;
    }
    if (deviceId) {
      result.deviceId = deviceId;
    }

    return result;
  }

  static async _getIpGeolocation() {
    const data = await this._fetchWithRetry({
      method: 'get',
      url: `http://ip-api.com/json`
    })

    if (!data || data.status === 'fail') return null;

    return data;
  }

  static async _getDeviceId() {
    const fp = await FingerprintJS.load();
    const deviceData = await fp.get();
    return deviceData.visitorId
  }

  static async _fetchWithRetry(options = {}, maxRetries = 10, retryDelay = 200) {
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        const response = await axios(options);
        if (response.status >= 400) {
          console.error(`HTTP error! status: ${response.status}`);
          retryCount++;
          continue;
        }
        return response.data;
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          console.error(`Fetch failed after ${maxRetries} attempts:`, error);
          return null;
        }

        console.log(`Attempt ${retryCount} failed. Retrying in ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }

    return null;
  }
}

export default UserRequest;
