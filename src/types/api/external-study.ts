export interface ExternalStudy {
    title: string;
    id: string;
    link:string;
    roles: string[];
    technologies: string[];
    deadlineDate: [],
  }
  
  export interface ExternalStudyResponse {
    externalStudies: {
      content: ExternalStudy[];
      deadlineDate: [];
    }
  };