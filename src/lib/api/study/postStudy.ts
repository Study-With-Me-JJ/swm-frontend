import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse } from '@/types/api/study-recruit/postStudy';

export const postStudy = async (studyData: any): Promise<ApiResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${API_ENDPOINTS.STUDY.CREATE}`;

  // const requestBlob = studyData.get('request') as Blob;
  // const requestData = await requestBlob.text().then(JSON.parse);

  const res = await axios.post(url, studyData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
};
