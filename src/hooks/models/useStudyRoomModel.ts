import { useState } from 'react';
import { SortCriteria, StudyRoomListParams } from "@/types/api";

export const useStudyRoomModel = () => {
  const [filters, setFilters] = useState<Partial<StudyRoomListParams>>({
    sortCriteria: SortCriteria.STARS,
    headCount: undefined,
    minPricePerHour: undefined,
    maxPricePerHour: undefined,
    options: [],
    title: ''
  });

  const handleFilterChange = (newFilters: Partial<StudyRoomListParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  return {
    filters,
    handleFilterChange
  };
}; 