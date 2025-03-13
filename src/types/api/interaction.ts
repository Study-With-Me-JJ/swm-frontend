export interface InteractionStatusProps extends InteractionResponse {
  studyId: string;
}

export interface InteractionResponse {
  likeCount: number;
  commentCount: number;
  viewCount: number;
}
