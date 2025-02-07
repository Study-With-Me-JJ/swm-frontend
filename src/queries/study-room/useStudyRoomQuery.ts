import { useInfiniteQuery } from '@tanstack/react-query';
import { StudyRoomService } from '@/lib/api/services';
import { StudyRoomListParams } from '@/types/api';

export const studyRoomQueryKey = {
  list: (filters: Partial<StudyRoomListParams>) => ['studyRoomList', filters] as const
};

export const useStudyRoomQuery = (filters: Partial<StudyRoomListParams>) => {
  return useInfiniteQuery({
    queryKey: studyRoomQueryKey.list(filters),
    queryFn: async ({ pageParam }: { pageParam: Pick<StudyRoomListParams, 'lastStudyRoomId' | 'lastSortValue' | 'lastAverageRatingValue' | 'lastLatitudeValue' | 'lastLongitudeValue'> | null }) => {
      const response = await StudyRoomService.getStudyRoomList({ 
        queryParams: {
          ...filters, 
          lastStudyRoomId: pageParam?.lastStudyRoomId,
          lastSortValue: pageParam?.lastSortValue,
          lastAverageRatingValue: pageParam?.lastAverageRatingValue,
          lastLatitudeValue: pageParam?.lastLatitudeValue,
          lastLongitudeValue: pageParam?.lastLongitudeValue,
        }
      });
      return response;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext && lastPage.data.data.length > 0) {
        const lastItem = lastPage.data.data[lastPage.data.data.length - 1];
        return {
          lastStudyRoomId: lastItem.studyRoomId,
          lastSortValue: lastItem.starAvg,
          lastAverageRatingValue: lastItem.starAvg, 
          lastLatitudeValue: lastItem.coordinates.latitude,
          lastLongitudeValue: lastItem.coordinates.longitude,
        };
      }
      return null;
    },
  });
}; 