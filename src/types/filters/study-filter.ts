import { StudyCategory, RecruitmentPosition, StudyStatus } from "@/types/api/study";
export interface StudyFilterProps {
    type: string | null;
    onChange: (value: string | string[]) => void;
    defaultValue: string | string[];
    options: { id: number; value: string; label: string }[];
    isOpen: boolean;
    onToggle: () => void; 
    filterName?: string;
}

export const positionOptions = [
    { id: 0, value: 'ALL', label: '직무 전체' },
    { id: 1, value: RecruitmentPosition.BACKEND, label: '백엔드' },
    { id: 2, value: RecruitmentPosition.FRONTEND, label: '프론트엔드' },
    { id: 3, value: RecruitmentPosition.DESIGNER, label: '디자이너' },
    { id: 4, value: RecruitmentPosition.PM, label: '기획자' },
    { id: 5, value: RecruitmentPosition.MARKETING, label: '마케터' },
    { id: 6, value: RecruitmentPosition.ETC, label: '기타' },
  ];
  
  export const categoryOptions = [
    { id: 0, value: 'ALL', label: '카테고리 전체' },
    { id: 1, value: StudyCategory.ALGORITHM, label: '알고리즘' },
    { id: 2, value: StudyCategory.BIGDATA, label: '빅데이터' },
    { id: 3, value: StudyCategory.DATAANALYSIS, label: '데이터분석' },
    { id: 4, value: StudyCategory.MACHINELEARNING, label: '머신러닝' },
    { id: 5, value: StudyCategory.DEVELOPMENT, label: '개발' },
    { id: 6, value: StudyCategory.ETC, label: '기타' },
  ];

  export const statusOptions = [
    { id: 0, value: 'ALL', label: '상태전체' },
    { id: 1, value: StudyStatus.ACTIVE, label: '모집중' },
    { id: 2, value: StudyStatus.INACTIVE, label: '모집마감' }, 
  ];