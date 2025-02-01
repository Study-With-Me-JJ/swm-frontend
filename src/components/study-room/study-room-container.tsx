import { devLog } from "@/utils/dev-log";
import { useStudyRoomQuery } from "@/queries/useStudyRoomQuery";
import { useStudyRoomModel } from "@/hooks/models/useStudyRoomModel";
import { StudyRoomFilter } from "@/components/study-room/study-room-filter";
import { StudyRoomList } from "@/components/study-room/study-room-list";

export function StudyRoomContainer() {
  const { filters, handleFilterChange } = useStudyRoomModel();
  const { 
    data,
    fetchNextPage,
    hasNextPage,
  } = useStudyRoomQuery(filters);

  devLog.info('StudyRoom', data);

  return (
    <div>
      <StudyRoomFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <StudyRoomList
        data={data}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}