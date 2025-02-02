import { StudyRoomListParams, SortCriteria } from '@/types/api';        

export interface StudyRoomFilterProps {
  filters: Partial<StudyRoomListParams>;
  onFilterChange: (filters: Partial<StudyRoomListParams>) => void;
}

export const StudyRoomFilter = ({ filters, onFilterChange }: StudyRoomFilterProps) => {
  return (
    <div>
      <input
        type="text"
        value={filters.title || ''}
        onChange={(e) => onFilterChange({ title: e.target.value })}
        placeholder="스터디룸 검색"
      />

      <div>
        <input
          type="number"
          value={filters.minPricePerHour || ''}
          onChange={(e) => onFilterChange({ 
            minPricePerHour: e.target.value ? Number(e.target.value) : undefined 
          })}
          placeholder="최소 가격"
        />
        <input
          type="number"
          value={filters.maxPricePerHour || ''}
          onChange={(e) => onFilterChange({ 
            maxPricePerHour: e.target.value ? Number(e.target.value) : undefined 
          })}
          placeholder="최대 가격"
        />
      </div>

      <select
        value={filters.sortCriteria}
        onChange={(e) => onFilterChange({ 
          sortCriteria: e.target.value as SortCriteria 
        })}
      >
        <option value="STARS">평점순</option>
        <option value="LIKES">좋아요순</option>
        <option value="REVIEWS">후기순</option>
        <option value="PRICE">가격순</option>
      </select>
    </div>
  );
}; 