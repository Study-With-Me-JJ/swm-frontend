import { StudyRoomListResponse } from '@/types/api';
import { InfiniteData } from '@tanstack/react-query';

interface StudyRoomListProps {
  data: InfiniteData<StudyRoomListResponse> | undefined;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export const StudyRoomList = ({ data, hasNextPage, fetchNextPage }: StudyRoomListProps) => {
  return (
    <div>
      {data?.pages.flatMap(page => 
        page.data.data.map(room => (
          <div key={room.studyRoomId}>
            {room.title}
          </div>
        ))
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          더 보기
        </button>
      )}
    </div>
  );
};