import {
  RecruitmentPositionTitle,
  StudyCategory,
} from '@/types/api/study-recruit/study';

export interface ApiResponse {
  message: string;
  data: CreateStudyRequest;
}

export interface CreateStudyRequest {
  title: string;
  content: string;
  openChatUrl: string;
  category: StudyCategory;
  tagList?: string[];
  imageUrlList?: string[];
  createRecruitmentPositionRequestList: {
    title: RecruitmentPositionTitle;
    headcount: number;
  }[];
}

//스터디 북마크 추가
export interface PostBookmarkResponse {
  message: string;
  data: {
    bookmarkId: string;
  };
}
