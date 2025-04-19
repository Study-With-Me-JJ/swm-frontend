import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse, EditRecruitmentPositionResponse, EditRecruitmentPositionRequest, ApplyRecruitmentPositionRequest } from '@/types/api/study-recruit/recruitmentPosition';  

// 스터디 모집 포지션 수정
export const editRecruitmentPosition = async (studyId: string, positionData: EditRecruitmentPositionRequest): Promise<ApiResponse<EditRecruitmentPositionResponse>> => {
    try {
        console.log('positionData', positionData);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.EDIT_POSITION(studyId)}`; 

        const response = await axios.patch(url,
            positionData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};   

// 스터디 모집 참여 신청
export const applyRecruitmentPosition = async (recruitmentPositionId: string, applyData: ApplyRecruitmentPositionRequest): Promise<ApiResponse<null>> => {
    try { 
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.APPLY(recruitmentPositionId)}`; 
        const response = await axios.post(url, applyData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }); 
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 스터디 참여신청 포지션 변경
export const changeRecruitmentPosition = async (recruitmentPositionId: string, participationId: string): Promise<ApiResponse<null>> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.APPLY_POSITION_CHANGE(recruitmentPositionId, participationId)}`;
        const response = await axios.patch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}