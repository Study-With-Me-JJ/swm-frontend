export const API_ENDPOINTS = { 
    STUDY_ROOM: {
      LIST: '/api/v1/studyroom',
      DETAIL: (studyRoomId: number | string) => `/api/v1/studyroom/${studyRoomId}`,
      CREATE: '/api/v1/studyroom',
      UPDATE: (id: number | string) => `/api/v1/studyroom/${id}`,
      DELETE: (id: number | string) => `/api/v1/studyroom/${id}`,
    }, 
    EXTERNAL_STUDY: {
        LIST: '/api/v1/external/studies',
    },
    USER: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      JOIN: '/api/v1/user/custom'
    }
  } as const;
 