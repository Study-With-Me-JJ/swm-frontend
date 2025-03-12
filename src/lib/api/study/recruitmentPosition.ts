import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse, EditRecruitmentPositionRequest } from '@/types/api/study-recruit/recruitmentPosition';

export const editRecruitmentPosition = async (recruitmentPositionId: string | undefined, positionData: EditRecruitmentPositionRequest): Promise<ApiResponse> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.EDIT_POSITION(recruitmentPositionId || '')}`;

        const response = await axios.patch(url,
            positionData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};