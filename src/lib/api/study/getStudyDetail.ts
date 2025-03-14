import { API_ENDPOINTS } from '../endpoints';
import axios from 'axios';
import { ApiResponse } from '@/types/api/study-recruit/getStudyDetail';

export const getStudyDetail = async (studyId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.DETAIL(studyId)}`;

    // console.log('Auth Token:', localStorage.getItem('accessToken'));

    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await axios.get<ApiResponse>(url, { headers });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching study detail:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

//스터디 삭제
export const deleteStudy = async (studyId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.DELETE(studyId)}`;
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error deleting study:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
