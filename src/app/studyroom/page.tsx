'use client';

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { devLog } from "@/utils/dev-log";
import { StudyRoomService } from "@/lib/api/services";
import { SortCriteria, StudyRoomListParams } from "@/types/api";

export default function StudyRoom() {
  const [filters, setFilters] = useState<Partial<StudyRoomListParams>>({
    sortCriteria: 'STARS',
    headCount: undefined,
    minPricePerHour: undefined,
    maxPricePerHour: undefined,
    options: [],
    title: ''
  });

  const fetchStudyRoomList = async ({ pageParam }: { pageParam: Pick<StudyRoomListParams, 'lastStudyRoomId' | 'lastAverageRatingValue'> | null }) => {
    const response = await StudyRoomService.getStudyRoomList({ 
          queryParams: {
            ...filters, 
            lastStudyRoomId: pageParam?.lastStudyRoomId,
            lastAverageRatingValue: pageParam?.lastAverageRatingValue,
          }
        })
    return response;
  }

  const { 
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['studyRoomList', filters],
    queryFn: fetchStudyRoomList,
    initialPageParam: null as Pick<StudyRoomListParams, 'lastStudyRoomId'> | null,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext && lastPage.data.data.length > 0) {
        const lastItem = lastPage.data.data[lastPage.data.data.length - 1];
        return {
          lastStudyRoomId: lastItem.studyRoomId
        };
      }
      return null;
    },
  });

  devLog.info('StudyRoom', data);

  const handleFilterChange = (newFilters: Partial<StudyRoomListParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  return (
    <div>
      <input
        type="text"
        value={filters.title || ''}
        onChange={(e) => handleFilterChange({ title: e.target.value })}
        placeholder="스터디룸 검색"
      />

      <div>
        <input
          type="number"
          value={filters.minPricePerHour || ''}
          onChange={(e) => handleFilterChange({ 
            minPricePerHour: e.target.value ? Number(e.target.value) : undefined 
          })}
          placeholder="최소 가격"
        />
        <input
          type="number"
          value={filters.maxPricePerHour || ''}
          onChange={(e) => handleFilterChange({ 
            maxPricePerHour: e.target.value ? Number(e.target.value) : undefined 
          })}
          placeholder="최대 가격"
        />
      </div>

      <select
        value={filters.sortCriteria}
        onChange={(e) => handleFilterChange({ 
          sortCriteria: e.target.value as SortCriteria 
        })}
      >
        <option value="STARS">평점순</option>
        <option value="LIKES">좋아요순</option>
        <option value="REVIEWS">후기순</option>
        <option value="PRICE">가격순</option>
      </select>

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
}