import { axiosInstance } from './axios';
import { API_ENDPOINTS } from './endpoints';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
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
    await axiosInstance.patch(API_ENDPOINTS.AUTH.LOGOUT);
    clearAuthData();
    return { success: true };
  } catch {
    clearAuthData();

    return { success: true };
  }
};
