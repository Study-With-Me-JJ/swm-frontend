import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { UserInfoResponse } from "@/types/api/user-info";
import axios from "axios";

export async function getUserInfo(): Promise<UserInfoResponse> {
   
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.USER.INFO}`; 
        const res = await axios.get<UserInfoResponse>(url);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching user info:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}