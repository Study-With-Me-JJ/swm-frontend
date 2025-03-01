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
    localStorage.removeItem('accessToken');
  };

  const token = localStorage.getItem('accessToken');
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  try {
    await axiosInstance.patch(API_ENDPOINTS.AUTH.LOGOUT);
    clearAuthData();
    return { success: true };
  } catch {
    clearAuthData();
    return { success: true };
  }
};

export const getUserInfo = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }

  try {
    const response = await axiosInstance.get(API_ENDPOINTS.USER.INFO, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.data) {
      throw new Error('사용자 정보를 불러오는데 실패했습니다.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
