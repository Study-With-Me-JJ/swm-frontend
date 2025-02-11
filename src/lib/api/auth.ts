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
  const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  try {
    await axiosInstance.patch(API_ENDPOINTS.USER.LOGOUT);
    clearAuthData();
    return { success: true };
  } catch (error) { 
    clearAuthData();
     
    // console.log('로그아웃 에러 상세:', error);
     
    if (error instanceof AxiosError && error.response?.status === 401) {
      return { success: true };
    }
    
    return { success: true };  
  }
};