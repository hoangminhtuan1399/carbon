import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import md5 from 'crypto-js/md5';

function hashToUUID(input) {
  const hash = md5(input).toString();
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

class UserRequest {
  static async getData() {
    const result = {
      timezone: '',
      deviceId: '',
      ipAddress: '',
      appVersion: import.meta.env.VITE_APP_VERSION,
      locationInfo: ''
    };

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
    });

    if (!data || data.status === 'fail') return null;

    return data;
  }

  static async _getDeviceId() {
    try {
      const fp = await FingerprintJS.load({
        apiKey: '0O2Ja63IU3kuA9bFfEE3',
        region: 'ap'
      });
      const deviceData = await fp.get();
      return hashToUUID(deviceData.visitorId);
    } catch (e) {
      console.error('Get device id error: ', e);
      return null;
    }
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
