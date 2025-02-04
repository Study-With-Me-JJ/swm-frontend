export interface ApiResponse<T> {
  message: string;
  data: PaginatedResponse<T>;
}

interface StudyTag {
  studyTagId: number;
  name: string;
}

export interface Study {
  userId: string;
  studyId: number;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  likeCount: number;
  commentCount: number;
  status: string;
  viewCount: number;
  nickname: string;
  profileImageUrl: string | null;
  studyBookmarkId: number | null;
  tagInquiryListResponse: StudyTag[];
}
  
  export type StudyResponse = ApiResponse<Study>;
  
  export interface PaginatedResponse<T> {
    numberOfElements: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
    data:T[];
}
