import Cookies from 'js-cookie';
import { KEYS } from "../constants/keys.js";

export const checkAccessToken = () => {
  return Cookies.get(KEYS.ACCESS_TOKEN)
}

export const saveAccessToken = (accessToken) => {
  return Cookies.set(KEYS.ACCESS_TOKEN, accessToken)
}
