import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse } from '@/types/api/study-recruit/editStudy';
import type { CreateStudyRequest } from '@/types/api/study-recruit/postStudy';

export const editStudy = async (
  studyId: string,
  studyData: CreateStudyRequest,
): Promise<ApiResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${API_ENDPOINTS.STUDY.PATCH(studyId)}`;
  const res = await axios.patch(url, studyData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
};

// 스터디 모집 상태수정
export const updateStudyStatus = async (studyId: string, status: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${API_ENDPOINTS.STUDY.STATUS(studyId)}`;
  const res = await axios.patch(url, { status }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
};

