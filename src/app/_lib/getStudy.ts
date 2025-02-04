import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { StudyResponse } from "@/types/api/study";
import axios from "axios";

export async function getStudy(): Promise<StudyResponse> {
   
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.LIST}`; 
        const res = await axios.get<StudyResponse>(url);
        console.log('[getStudy] Response:', JSON.stringify(res.data, null, 2));
        return res.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching study rooms:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}