import {
  RecruitmentPositionTitle,
  StudyCategory,
  StudyStatus,
} from '@/types/api/study-recruit/study';

export interface ApiResponse {
  message: string;
  data: StudyDetailRequest;
}

export interface StudyDetailRequest {
  studyId: number;
  title: string;
  content: string;
  category: StudyCategory;
  likeCount: number;
  commentCount: number;
  status: StudyStatus;
  viewCount: number;
  userId: string;
  nickname: string;
  profileImageUrl: string | null;
  likeStatus: boolean;
  openChatUrl: string;
  studyBookmarkId: number;
  getTagResponseList: {
    tagId: number;
    name: string;
  }[];
  getImageResponseList: {
    imageId: number;
    imageUrl: string | null;
  }[];
  getRecruitmentPositionResponseList: {
    recruitmentPositionId: number;
    title: RecruitmentPositionTitle;
    headcount: number;
    acceptedCount: number;
  }[];
  pageCommentResponse: {
    numberOfElements: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
    data: {
      commentId: number;
      content: string;
      userId: string;
      nickname: string;
      profileImageUrl: string | null;
      createdAt: string | number[];
      updatedAt: string;
      replyCount: number;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}
