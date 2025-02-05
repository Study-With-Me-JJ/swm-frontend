import { StudyRoomListResponse } from '@/types/api';
import { useEffect, useRef } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { devLog } from '@/utils/dev-log';

export interface StudyRoomListProps {
  data: InfiniteData<StudyRoomListResponse> | undefined;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
}

export const StudyRoomList = ({ data, hasNextPage, fetchNextPage, isLoading }: StudyRoomListProps) => {
  const nextFetchTargetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nextFetchTarget = nextFetchTargetRef.current;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const fetchCallback: IntersectionObserverCallback = (entries, observer) => {
      devLog.info('check', entries);
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage?.();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(fetchCallback, options);

    if (nextFetchTarget) {
      devLog.info('nextFetchTarget', nextFetchTarget);
      observer.observe(nextFetchTarget);
    }

    return () => {
      if (nextFetchTarget) {
        observer.unobserve(nextFetchTarget);
      }
    };
  }, [data, hasNextPage, fetchNextPage]);
  
  return (
    <div className="flex flex-col gap-4 flex-wrap">
      <div>
        {data?.pages.flatMap(page => 
          page.data.data.map(room => (
            <div key={room.title + room.studyRoomId} className="flex flex-col  gap-4">
              <div className="w-[200px] h-[150px] bg-gray-200 rounded-md"></div>
              <div>
                <h3 className="text-[18px] font-[600] text-black">{room.title}</h3>
                <p className="text-[14px] text-gray-500">{room.locality}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {!isLoading && hasNextPage && (
        <div ref={nextFetchTargetRef}>. . .</div>
      )}
    </div>
  );
};