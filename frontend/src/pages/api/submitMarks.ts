import axios from "axios";
import { API_URL } from "../../config";
import storage from "../../utils/storage";

export type marksDetails = {
  maths: number;
  science: number;
  sst: number;
  english: number;
  hindi: number;
  userId: string;
};

export const submitMarks = (payload: marksDetails) => {
  const token = storage.getToken();
  return axios.post(`${API_URL}/marks/add`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
