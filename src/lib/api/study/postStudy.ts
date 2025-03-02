import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse } from '@/types/api/postStudy';

export const postStudy = async (data: FormData): Promise<ApiResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${API_ENDPOINTS.STUDY.CREATE}`;

  const requestBlob = data.get('request') as Blob;
  const requestData = await requestBlob.text().then(JSON.parse);

  const res = await axios.post(url, requestData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
};
