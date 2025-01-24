
import { axiosInstance } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";    
import { notFound } from "next/navigation";
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

// interface StudyRoomResponse {
//     data: StudyRoom[];
//     numberOfElements: number;
//     totalPages: number;
//     totalElements: number;
//     hasNext: boolean;
// }


export async function generateStaticParams() {
    try {
        return [
            { id: '287' },
        ]
    } catch (error) {
        console.error('스터디룸 목록 가져오기 실패:', error);
        return [];
    }
}

export default async function StudyRoomDetailPage({ params }: { params: { id: string } }) {
    try {
        const response = await axiosInstance.get<{message: string, data: StudyRoom}>(API_ENDPOINTS.STUDY_ROOM.DETAIL.replace(':studyRoomId', params.id)); 
        const studyRoom = response.data.data;

        if (!studyRoom) {
            notFound();
        }

        return (
            <div>
                <h1>StudyRoomDetailPage</h1>
                <p>{params.id}</p>
                <p>{studyRoom.title}</p>
            </div>
        );
    } catch (error) {
        console.error('스터디룸 상세 정보 가져오기 실패:', error);
        return <div>스터디룸을 불러오는데 실패했습니다.</div>;
    }
}
