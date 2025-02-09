import { axiosInstance } from './axios';
import { API_ENDPOINTS } from './endpoints';
import { AxiosError } from 'axios';

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
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {  
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expirationTime');
        delete axiosInstance.defaults.headers.common['Authorization'];
        return { success: true };
      }
       
      const errorMessage = error.response?.data?.messageClient 
        || '로그아웃 중 오류가 발생했습니다.';
      throw new Error(errorMessage);
    }
     
    throw new Error('로그아웃 중 예기치 않은 오류가 발생했습니다.');
  }
};