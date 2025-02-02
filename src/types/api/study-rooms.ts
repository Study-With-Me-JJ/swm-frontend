export interface StudyRoom {
    studyRoomId: number;
    title: string;
    thumbnail: string;
    locality: string;
    phoneNumber: string;
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
  
  export interface StudyRoomResponse {
      data: StudyRoom[];
      numberOfElements: number;
      totalPages: number;
      totalElements: number;
      hasNext: boolean;
  }