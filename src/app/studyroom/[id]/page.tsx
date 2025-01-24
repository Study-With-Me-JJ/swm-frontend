
import { axiosInstance } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints"; 

interface StudyRoom {
    studyRoomId: number;
    title: string;
    thumbnail: string;
    locality: string;
    likeCount: number;
    reviewCount: number;
    entireMinPricePerHour: number;
    entireMaxHeadcount: number;
    starAvg: number;
    studyBookmarkId: number | null;
    tags: {
        studyRoomTagId: number;
        tag: string;
    }[];
}

interface StudyRoomResponse {
    data: StudyRoom[];
    numberOfElements: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
}


const getAllStudyRooms = async (): Promise<StudyRoomResponse> => {
    try {
        const response = await axiosInstance.get<{message: string, data: StudyRoomResponse}>(API_ENDPOINTS.STUDY_ROOM.LIST);
        return response.data.data; // StudyRoomResponse 타입 반환
    } catch (error) {
        console.error('스터디룸 데이터 가져오기 실패:', error);
        return {
            data: [],
            numberOfElements: 0,
            totalPages: 0,
            totalElements: 0,
            hasNext: false
        }; // 빈 StudyRoomResponse 객체 반환
    }
}



export async function generateStaticParams() {
    try {
        const studyRoomsData = await getAllStudyRooms();
        console.log('생성될 정적 경로:', studyRoomsData);

        if (!studyRoomsData || !Array.isArray(studyRoomsData.data)) {
            console.warn('스터디룸 데이터가 없거나 올바르지 않은 형식입니다.');
            return [];
        }

        const params = studyRoomsData.data.map((room: StudyRoom) => ({
            id: room.studyRoomId.toString()
        }));

        console.log('최종 생성된 params:', params);
        return params;
        
    } catch (error) {
        console.error('정적 경로 생성 실패:', error);
        return [];
    }
}


export default async function StudyRoomDetailPage({ params }: { params: { id: string } }) {
    const response = await axiosInstance.get<{message: string, data: StudyRoom}>(
        API_ENDPOINTS.STUDY_ROOM.DETAIL(Number(params.id))
    );
    const studyRoom = response.data.data; 

    return (
        <div>
            <h1>StudyRoomDetailPage</h1>
            <p>{params.id}</p>
            <p>{studyRoom.title}</p>
        </div>
    );
    
}
