import axios from "axios";
import { API_URL } from "../../../config";

export type loginDetails = {
  email: string;
  password: string;
};

export const loginApi = (payload: loginDetails) => {
  return axios.post(`${API_URL}/auth/login`, payload);
};
