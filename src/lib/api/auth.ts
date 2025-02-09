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
    try {
      await axiosInstance.patch(API_ENDPOINTS.USER.LOGOUT);
    } catch (serverError: any) { 
      if (serverError.response?.status !== 401) { 
        throw serverError;
      }
    }
 
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');
     
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    return { success: true };
  } catch (error: any) { 
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    if (error.response?.data?.messageClient) {
      throw new Error(error.response.data.messageClient);
    }
    throw new Error('로그아웃 처리 중 오류가 발생했습니다.');
  }
};