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