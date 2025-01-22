
import { axiosInstance } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints"; 

interface StudyRoomListItem {
    studyRoomId: number;
    title: string; 
}

export async function generateStaticParams() {  
    try {   
        const response = await axiosInstance.get(API_ENDPOINTS.STUDY_ROOM.LIST);
        const studyRooms = Array.isArray(response.data) ? response.data as StudyRoomListItem[] : response.data.content as StudyRoomListItem[] || [];

        if (studyRooms.length === 0) {
            console.warn('스터디룸 목록이 비어있습니다.');
            return [];
        }

        const params = studyRooms
            .filter((item: any) => item.studyRoomId != null)
            .map((item: any) => ({ 
                id: item.studyRoomId.toString()  
            }));

        return params;
    } catch (error) {
        console.error('Error generating static params:', error);
        return [ ];
    }
}

interface StudyRoom {
    studyRoomId: number;
    title: string; 
}

export default async function StudyRoomDetailPage({ params }: { params: { id: string } }) {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.STUDY_ROOM.DETAIL(Number(params.id)));
        const studyRoom: StudyRoom = response.data; 

        if (!studyRoom) {
            throw new Error('스터디룸을 찾을 수 없습니다.');
        }

        return (
            <div>
                <h1>StudyRoomDetailPage</h1>
                <p>{params.id}</p>
                <p>{studyRoom.title}</p>
            </div>
        );
    } catch (error) {
        console.error('스터디룸 상세 정보를 불러오는데 실패했습니다:', error);
        return (
            <div>
                <h1>에러가 발생했습니다</h1>
                <p>스터디룸 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.</p>
            </div>
        );
    }
}
