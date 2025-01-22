import { publicAxiosInstance } from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { StudyRoomListParams, StudyRoomListResponse } from '@/types/api';

export const StudyRoomService = {
  getStudyRoomList: async ({ queryParams }: { 
    queryParams: StudyRoomListParams
  }): Promise<StudyRoomListResponse> => {
    const params = {
      ...queryParams,
      options: queryParams.options?.join(',')
    };

    const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string | number> & StudyRoomListParams);

    const response = await publicAxiosInstance.get<StudyRoomListResponse>(API_ENDPOINTS.STUDY_ROOM.LIST, { 
      params: cleanParams
    });
    return response.data;
  }
};