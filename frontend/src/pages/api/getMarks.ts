import axios from "axios";
import { API_URL } from "../../config";
import storage from "../../utils/storage";

interface MarksData {
  maths?: string;
  science?: string;
  sst?: string;
  hindi?: string;
  data: any;  
  english?: string;
}

interface MarksApiResponse {
  data: MarksData;
  userId: string;
  maths: string;
  science: string;
  sst: string;
  english: string;
  hindi: string;
}

export const getMarks = (id: string): Promise<MarksApiResponse> => {
  const token = storage.getToken();

  return axios.get(`${API_URL}/marks/get/${id} `, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
