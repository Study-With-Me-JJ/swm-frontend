// 스터디 참여 신청 상태
export enum StudyParticipationStatus {
  PENDING = 'PENDING', // 신청대기
  APPROVED = 'APPROVED', // 신청승인
  REJECTED = 'REJECTED', // 거절
  CANCEL = 'CANCEL', // 취소
}

export const STATUS_LABELS: Record<StudyParticipationStatus, string> = {
  [StudyParticipationStatus.PENDING]: '신청대기',
  [StudyParticipationStatus.APPROVED]: '신청승인',
  [StudyParticipationStatus.REJECTED]: '거절',
  [StudyParticipationStatus.CANCEL]: '취소',
};

export interface ApiResponse<T> {
  message: string;
  data: T;
}

// 스터디 모집 포지션 수정 응답
export interface EditRecruitmentPositionResponse {
  recruitmentPositionId: number;
  title: string;
  headcount: number;
}

// 스터디 모집 포지션 수정 요청
export interface EditRecruitmentPositionRequest {
  createRecruitmentPositionRequests: {
    title: string;
    headcount: number;
  }[];
  updateRecruitmentPositionRequests: {
    recruitmentPositionId: number;
    title: string;
    headcount: number;
  }[];
  recruitmentPositionIdsToRemove: number[]; 
  }

// 스터디 모집 참여 신청 
export interface ApplyRecruitmentPositionRequest {
  kakaoId: string;
  coverLetter: string;
  links?: string[];
  fileInfo?: {
    fileUrl: string;
    fileName: string;
  }
}
   
// 스터디 참여 조회 응답 (작성자전용)
export interface GetStudyParticipationResponse {
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  data: {
    participationId: number;
    status: StudyParticipationStatus;
    coverLetter: string;
    userId: string;
    profileImageUrl: string;
    nickname: string;
  }[];
}

// 스터디 참여 조회 요청 (작성자전용)
export interface GetStudyParticipationRequest {
  status: StudyParticipationStatus;
  pageNo: number; 
}