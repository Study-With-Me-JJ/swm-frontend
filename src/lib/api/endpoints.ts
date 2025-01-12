export const API_ENDPOINTS = { 
    STUDY_ROOM: {
      LIST: '/studyroom',
      DETAIL: (id: number | string) => `/studyroom/${id}`,
      CREATE: '/studyroom',
      UPDATE: (id: number | string) => `/studyroom/${id}`,
      DELETE: (id: number | string) => `/studyroom/${id}`,
    }, 
  } as const;