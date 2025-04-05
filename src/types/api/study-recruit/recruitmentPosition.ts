// 스터디 모집 포지션 수정
export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface EditRecruitmentPositionRequest {
  title: string;
  headcount: number; 
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
   