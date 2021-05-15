import axios from "axios";
import constants from "../constants";
import { LoginResponseType } from "../types";
import StorageService from "./StorageService";

const login = (email: string, password: string) => {
  const url = `${constants.BASE_URL}/auth/login`;
  return axios
    .post<LoginResponseType>(url, { email, password })
    .catch((e) => Promise.reject(e.response.data));
};

const profile = async () => {
  const url = `${constants.BASE_URL}/auth/profile`;
  const token = await StorageService.getData("token");
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


const register = (name:string,email: string, password: string) => {
  const url = `${constants.BASE_URL}/auth/login`;
  return axios
    .post<LoginResponseType>(url, { name,email, password })
    .catch((e) => Promise.reject(e.response.data));
};




export default { login, profile,register };
