export const API_ENDPOINTS = { 
    STUDY_ROOM: {
      LIST: '/api/v1/studyroom',
      DETAIL: '/api/v1/studyroom/:studyRoomId',
      CREATE: '/api/v1/studyroom', 
    }, 
    EXTERNAL_STUDY: {
        LIST: '/api/v1/external/studies', 
    },
    USER: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      JOIN: '/api/v1/user/custom',
      INFO: '/api/v1/user'
    }
  } as const;
 