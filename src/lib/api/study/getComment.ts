import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse, Comment } from '@/types/api/study-recruit/getComment';

export const getComment = async (studyId: string, pageNo: number) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.COMMENT(studyId)}`;
    const res = await axios.get<ApiResponse<Comment>>(url, {
      params: { pageNo },
      paramsSerializer: {
        indexes: null,
      },
    });
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
