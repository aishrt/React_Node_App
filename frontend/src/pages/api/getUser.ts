//

import axios from "axios";
import { API_URL } from "../../config";
import storage from "../../utils/storage";
const token = storage.getToken();

export const getUser = () => {
  return axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
