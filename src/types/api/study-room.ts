import { ApiResponse, CursorPageData } from ".";

export enum SortCriteria {
  STARS = 'STARS',
  LIKES = 'LIKES',
  REVIEWS = 'REVIEWS',
  PRICE = 'PRICE'
}
  

  export type StudyRoomOption = 
  | 'WIFI'
  | 'PARKING'
  | 'FOOD'
  | 'DRINK'
  | 'PRINTER'
  | 'WHITEBOARD';

  export interface StudyRoomListParams {
    title?: string;                    // 검색어
    locality?: string;
    headCount?: number;                // 인원 수
    minPricePerHour?: number;         // 최소 시간당 가격 -> 최소 >= DB에 저장된 값 <= 최대
    maxPricePerHour?: number;         // 최대 시간당 가격
    options?: StudyRoomOption[];       // 옵션들
    sortCriteria?: SortCriteria;      // 정렬 기준
    userLatitude?: number;            // 유저 위도  
    userLongitude?: number;           // 유저 경도
    lastStudyRoomId?: number;         // 마지막 스터디룸 ID (커서)
    lastSortValue?: number;           // 마지막 정렬 값 (커서)
    lastLatitudeValue?: number;      // 마지막 위도 값 (커서)
    lastLongitudeValue?: number;      // 마지막 경도 값 (커서)
    lastAverageRatingValue?: number; // 마지막 평점 값 (커서)
}

export interface StudyRoomListRes {
    studyRoomId: number;
    title: string;
    thumbnail: string;
    locality: string;
    address: string;
    phoneNumber: string;
    likeCount: number;
    reviewCount: number;
    entireMinPricePerHour: number;
    entireMaxHeadcount: number;
    starAvg: number;
    coordinates: {
      latitude: number;
      longitude: number;
    }
    studyBookmarkId: number;
    tags: TagRes[];
}

export interface TagRes {
    studyRoomTagId: number;
    tag: string;
}

export type StudyRoomListResponse = ApiResponse<CursorPageData<StudyRoomListRes>>;
