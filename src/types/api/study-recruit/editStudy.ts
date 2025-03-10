import { StudyCategory } from '@/types/api/study-recruit/study';

export interface ApiResponse {
  message: string;
  data: EditStudyRequest;
}

export interface EditStudyRequest {
  title: string;
  content: string;
  openChatUrl: string;
  category: StudyCategory;
  saveTagRequest?: {
    tagListToAdd: string[];
    tagIdListToRemove: number[];
  };
  saveImageRequest?: {
    imageUrlListToAdd: string[];
    imageIdListToRemove: number[];
  }; 
}
