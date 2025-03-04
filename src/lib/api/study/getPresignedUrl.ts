import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';

export const getPresignedUrl = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${API_ENDPOINTS.FILES.PRESIGNED_URL}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

// 파일 업로드 함수
export const uploadFileToPresignedUrl = async (file: File) => {
  const { data } = await getPresignedUrl();

  // presigned URL로 파일 업로드
  await axios.put(data.presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  // 실제 이미지 URL 반환 (query string 제거)
  return data.presignedUrl.split('?')[0];
};
