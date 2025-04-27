// 스터디 참여 신청 상태
export enum StudyParticipationStatus {
  PENDING = 'PENDING', // 대기
  APPROVED = 'APPROVED', // 승인
  REJECTED = 'REJECTED', // 거절
}

export const STATUS_LABELS: Record<StudyParticipationStatus, string> = {
  [StudyParticipationStatus.PENDING]: '대기',
  [StudyParticipationStatus.APPROVED]: '승인',
  [StudyParticipationStatus.REJECTED]: '거절',
};

// 스터디 모집 포지션 수정
export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface EditRecruitmentPositionResponse {
  recruitmentPositionId: number;
  title: string;
  headcount: number;
}

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

export interface ApplyRecruitmentPositionRequest {
  kakaoId: string;
  coverLetter: string;
  links?: string[];
  fileInfo?: {
    fileUrl: string;
    fileName: string;
  }
}
   