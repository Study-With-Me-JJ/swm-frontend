import { axiosInstance } from './axios';
import { API_ENDPOINTS } from './endpoints';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.USER.LOGIN, {
      loginId: email,
      password: password,
    });

  return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.patch(API_ENDPOINTS.USER.LOGOUT);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');
    delete axiosInstance.defaults.headers.common['Authorization'];
    return { success: true };
  } catch (error: any) {
    if (error.response?.status === 401) {
      // 401 에러의 경우 정상적인 로그아웃으로 처리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expirationTime');
      delete axiosInstance.defaults.headers.common['Authorization'];
      return { success: true };
    }
    
    // 다른 에러의 경우 에러 throw
    const errorMessage = error.response?.data?.messageClient 
      || '로그아웃 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }
};