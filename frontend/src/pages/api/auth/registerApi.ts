import axios from "axios";
import { API_URL } from "../../../config";

export type registerDetails = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  address?: string;
  image?: string;
  role?: string;
};

export const registerApi = (payload: registerDetails) => {
  return axios.post(`${API_URL}/auth/register`, payload, {
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });
};
