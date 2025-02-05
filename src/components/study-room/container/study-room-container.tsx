'use client';

import { devLog } from "@/utils/dev-log";
import { useStudyRoomQuery } from "@/queries";
import { useStudyRoomModel } from "@/hooks/models";
import { StudyRoomFilter } from "@/components/study-room/filter/study-room-filter";
import { StudyRoomList } from "@/components/study-room/list/study-room-list";

export function StudyRoomContainer() {
  const { filters, handleFilterChange } = useStudyRoomModel();
  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useStudyRoomQuery(filters);

  devLog.info('StudyRoom', data);

  return (
    <div className="max-w-screen-xl py-[40px] xl:px-0 mx-auto">
      <h3 className="text-[24px] font-[600] text-black mb-[34px]">스터디 룸</h3>
      <StudyRoomFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <StudyRoomList
        data={data}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      />
    </div>
  );
}