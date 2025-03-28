import { API_ENDPOINTS } from '@/lib/api/endpoints';
import axios from 'axios';
import { ApiResponse, EditRecruitmentPositionRequest } from '@/types/api/study-recruit/recruitmentPosition';

// 스터디 모집 포지션 추가
export const addRecruitmentPosition = async (studyId: string, positionData: EditRecruitmentPositionRequest): Promise<ApiResponse> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.CREATE_POSITION(studyId)}`; 

        const response = await axios.post(url,
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

// 스터디 모집 포지션 수정
export const editRecruitmentPosition = async (recruitmentPositionId: string, positionData: EditRecruitmentPositionRequest): Promise<ApiResponse> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.EDIT_POSITION(recruitmentPositionId)}`; 

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

// 스터디 모집 포지션 삭제
export const deleteRecruitmentPosition = async (recruitmentPositionId: string): Promise<ApiResponse> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}${API_ENDPOINTS.STUDY.DELETE_POSITION(recruitmentPositionId)}`;

        const response = await axios.delete(url, {
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