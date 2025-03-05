export const API_ENDPOINTS = {
  STUDY_ROOM: {
    LIST: '/api/v1/studyroom',
    DETAIL: '/api/v1/studyroom/:studyRoomId',
    CREATE: '/api/v1/studyroom',
    LIKE: '/api/v1/studyroom/:studyRoomId/like',
    UNLIKE: '/api/v1/studyroom/like/:studyRoomId',
  },
  EXTERNAL_STUDY: {
    LIST: '/api/v1/external/studies',
  },
  STUDY: {
    LIST: '/api/v1/study',
    CREATE: '/api/v1/study',
    DETAIL: (studyId: string) => `/api/v1/study/${studyId}`,
    DELETE: (studyId: string) => `/api/v1/study/${studyId}`,
    COMMENT: (studyId: string) => `/api/v1/study/${studyId}/comment`,
  },
  FILES: {
    PRESIGNED_URL: '/api/v1/files/presigned-url',
  },
  USER: {
    INFO: '/api/v1/user',
    CREATE: '/api/v1/user',
    CHECK_NICKNAME: '/api/v1/user/nickname/validation',
    CHECK_EMAIL: '/api/v1/user/login-id/validation',
    SEND_AUTH_CODE: '/api/v1/user/login-id/auth-codes',
    CHECK_AUTH_CODE: '/api/v1/user/login-id/auth-codes/verification',
  },
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
  },
} as const;
