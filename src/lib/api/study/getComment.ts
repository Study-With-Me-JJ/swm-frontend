import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse, Comment } from '@/types/api/study-recruit/getComment';
import { ApiReplyResponse, Reply } from '@/types/api/study-recruit/getReply';

export const getComment = async (studyId: string, pageNo: number) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.COMMENT(studyId)}`;
    const res = await axios.get<ApiResponse<Comment>>(url, {
      params: { pageNo },
    });
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// 답글 조회
export const getReply = async (parentId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${API_ENDPOINTS.STUDY.REPLY(parentId)}`;
    const res = await axios.get<ApiReplyResponse<Reply>>(url);
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
