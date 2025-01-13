export const API_ENDPOINTS = { 
    STUDY_ROOM: {
      LIST: '/api/v1/studyroom',
      DETAIL: (id: number | string) => `/api/v1/studyroom/${id}`,
      CREATE: '/api/v1/studyroom',
      UPDATE: (id: number | string) => `/api/v1/studyroom/${id}`,
      DELETE: (id: number | string) => `/api/v1/studyroom/${id}`,
    }, 
  } as const;