export enum RecruitmentPosition {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  DESIGNER = 'DESIGNER',
  PM = 'PM',
  MARKETING = 'MARKETING',
  ETC = 'ETC',
}

export enum StudyCategory {
  ALGORITHM = 'ALGORITHM',
  BIGDATA = 'BIGDATA',
  DATAANALYSIS = 'DATAANALYSIS',
  MACHINELEARNING = 'MACHINELEARNING', 
  DEVELOPMENT = 'DEVELOPMENT',
  ETC = 'ETC',
}

export enum StudyStatus {
  ACTIVE = 'ACTIVE', 
  INACTIVE = 'INACTIVE',
}

export interface ApiResponse<T> {
  message: string;
  data: PaginatedResponse<T>;
}

export interface getTagResponseList {
  tagId: number;
  name: string;
}

export interface getRecruitmentPositionResponseList {
  recruitmentPositionId: number;
  title: string;
  headcount: number;
  acceptedCount: number;
}

export interface Study {
  studyId: number;
  title: string;
  content: string;
  category: string;
  likeCount: number;
  commentCount: number;
  status: string;
  viewCount: number;
  studyBookmarkId: number;
  getTagResponseList: getTagResponseList[];
  getRecruitmentPositionResponseList: getRecruitmentPositionResponseList[]; 
}
  
  export type StudyResponse = ApiResponse<Study>;
  
  export interface PaginatedResponse<T> {
    numberOfElements: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
    data:T[];
}
