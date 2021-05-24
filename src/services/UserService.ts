import axios from "axios";
import constants from "../constants";
import { LoginResponseType, RegisterResponseType } from "../types";
import StorageService from "./StorageService";

const login = async (email: string, password: string) => {
  const url = `${constants.BASE_URL}/auth/login`;
  try {
    return axios
      .post<LoginResponseType>(url, { email, password });
  } catch (e) {
    return await Promise.reject(e.response.data);
  }
};

const profile = async () => {
  const url = `${constants.BASE_URL}/auth/profile`;
  const token = await StorageService.getData("token");
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


const register = async (email: string, password: string, name:string) => {
  const url = `${constants.BASE_URL}/auth/register`;
  try {
    return axios
      .post<RegisterResponseType>(url, { email, password, name });
  } catch (e) {
    return await Promise.reject(e.response.data);
  }
};

const address = async () => {
  const url = `${constants.BASE_URL}/address`;
  const token = await StorageService.getData("token");
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const addressPost = async (line1: string, line2: string, city: string, state: string, pincode: string) => {
  const url = `${constants.BASE_URL}/address`;
  const token = await StorageService.getData("token");
  return await axios.post(url, { line1, line2, city, state, pincode }, {
    headers: { Authorization: `Bearer ${token}`, },
  });
};




export default { login, profile,register, address, addressPost, };
