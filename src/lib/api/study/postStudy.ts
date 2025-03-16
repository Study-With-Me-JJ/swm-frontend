import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse } from '@/types/api/study-recruit/postStudy';
import { PostBookmarkResponse } from '@/types/api/study-recruit/postStudy';
import type { CreateStudyRequest } from '@/types/api/study-recruit/postStudy';

export const postStudy = async (studyData: CreateStudyRequest): Promise<ApiResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${API_ENDPOINTS.STUDY.CREATE}`;

  const res = await axios.post(url, studyData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
};

//스터디 북마크 추가
export const addStudyBookmark = async (
  studyId: string,
): Promise<PostBookmarkResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.BOOKMARK(studyId)}`;
    const res = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    // console.log('북마크 추가 API 응답 데이터', res.data.data, url);
    return res.data;
  } catch (error) {
    console.error('북마크추가 오류:', error);
    throw error;
  }
};

//스터디 북마크 취소
export const deleteStudyBookmark = async (bookmarkId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.DELETE_BOOKMARK(bookmarkId)}`;
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    // console.log('북마크취소', res);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error deleting study bookmark:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

//스터디 좋아요 추가
export const addStudyLike = async (studyId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.LIKE(studyId)}`;
    const res = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    console.log('좋아요추가', res);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error adding study like:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

//스터디 좋아요 삭제
export const deleteStudyLike = async (studyId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.LIKE(studyId)}`;
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    console.log('좋아요취소', res);
    return res.data;
  } catch (error) {
    console.error('좋아요취소 오류:', error);
    throw error;
  }
};
