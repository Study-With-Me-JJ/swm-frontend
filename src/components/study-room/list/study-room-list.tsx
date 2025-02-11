import { StudyRoomListResponse } from '@/types/api';
import { useEffect, useRef } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { devLog } from '@/utils/dev-log';
import { BookmarkIcon, MapPinIcon, PencilIcon, HeartIcon, UsersIcon } from 'lucide-react';

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
    <div className="flex flex-col gap-4 mt-[34px]">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {data?.pages.flatMap(page => 
          page.data.data.map(room => (
            <div 
              key={room.title + room.studyRoomId} 
              className="group cursor-pointer min-w-[413px] w-full"
            >
              <div className="relative aspect-[413/160] overflow-hidden rounded-tl-[8px] rounded-tr-[8px]">
                <div className="w-full h-full bg-gray-100">
                  {room.thumbnail ? (
                    <img 
                      src={room.thumbnail} 
                      alt="Study Room Image" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = '/no-image-square.png';
                      }}
                    />
                  ) : (
                    <img src="/no-image-square.png" alt="No Image Available" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2 bg-[#F9F9F9] px-[26px] py-[24px] rounded-bl-[8px] rounded-br-[8px]">
                <div className="flex justify-between">
                  <div className="inline-block border border-[#4998E9] rounded-[16px]">
                    <span className="text-sm font-medium text-[#4998E9] font-[700] px-[12px] py-[9px]">
                      {room.entireMinPricePerHour || '0'}원<span className="text-[#828282] font-[500]">/시간</span>
                    </span>
                  </div>
                  <button>
                    <BookmarkIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <h3 className="font-semibold text-lg leading-tight">
                  {room.title}
                </h3>
                
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-sm">{room.locality}</span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <UsersIcon className="w-4 h-4" />
                  <span>최대 {room.entireMaxHeadcount || 'N'}명</span>
                </div>
                
                <div className="flex items-center justify-end gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <PencilIcon className="w-4 h-4" />
                    <span>{room.reviewCount || '0'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HeartIcon className="w-4 h-4" />
                    <span>{room.starAvg || '0'}</span>
                  </div>
                </div>
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