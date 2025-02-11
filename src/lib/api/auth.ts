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
  const clearAuthData = () => { 
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  try {
    await axiosInstance.patch(API_ENDPOINTS.USER.LOGOUT);
    clearAuthData();
    return { success: true };
  } catch (_) { 
    clearAuthData();
    
    return { success: true };  
  }
};