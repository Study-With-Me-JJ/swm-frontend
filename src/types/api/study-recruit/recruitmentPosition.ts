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
  links: string[];
  fileInfo: {
    fileUrl: string;
    fileName: string;
  }
}
   