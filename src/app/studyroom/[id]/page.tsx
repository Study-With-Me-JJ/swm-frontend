
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


const getAllStudyRooms = async () => {
    const response = await axiosInstance.get<{message: string, data: StudyRoomResponse}>(API_ENDPOINTS.STUDY_ROOM.LIST);
    return response.data.data.data;
}

interface StudyRoomListItem {
    studyRoomId: number;
    title: string;
}

export async function generateStaticParams() {
    try {
        const studyRoomsData = await getAllStudyRooms();
        console.log('생성될 정적 경로:', studyRoomsData);

        if (!Array.isArray(studyRoomsData) || studyRoomsData.length === 0) {
            console.warn('스터디룸 데이터가 없습니다. 기본 경로만 생성합니다.');
            return []; 
        }

        const params = studyRoomsData.map((room: StudyRoomListItem) => ({
            id: room.studyRoomId.toString()
        }));

        console.log('최종 생성된 params:', params);
        return params;
        
    } catch (error) {
        console.error('정적 경로 생성 실패:', error);
        throw error;
    }
}

interface StudyRoom {
    title: string;
}

export default async function StudyRoomDetailPage({ params }: { params: { id: string } }) {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDY_ROOM.DETAIL(Number(params.id)));
    const studyRoom: StudyRoom = response.data; 

    return (
        <div>
            <h1>StudyRoomDetailPage</h1>
            <p>{params.id}</p>
            <p>{studyRoom.title}</p>
        </div>
    );
    
}
