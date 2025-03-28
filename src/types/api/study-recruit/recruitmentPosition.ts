// 스터디 모집 포지션 수정
export interface ApiResponse {
  message: string;
  data: EditRecruitmentPositionRequest;
}

export interface EditRecruitmentPositionRequest {
  title: string;
  headcount: number; 
}
