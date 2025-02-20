import { API_ENDPOINTS } from "@/lib/api/endpoints"; 
import { ApiResponse, Study } from "@/types/api/study";
import { SearchStudyParams } from "@/types/api/study";
import axios from "axios";

export const getStudy = async (params: SearchStudyParams) => { 
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.LIST}`;  

        const res = await axios.get<ApiResponse<Study>>(url, { 
            params, 
            paramsSerializer: {
                indexes: null  
            }
        }); 
        // console.log('[getStudy] 응답 데이터 내용:', res.data);

        if (!res.data) {
            console.warn('[getStudy] 응답 데이터가 비어있습니다');
        }

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