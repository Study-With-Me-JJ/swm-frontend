import { axiosInstance } from "./axios";
import { API_ENDPOINTS } from "./endpoints";

export const checkNickname = async (nickname: string) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.USER.CHECK_NICKNAME, {
          params: { nickname: nickname }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

