import { StudyRoomListParams, SortCriteria } from '@/types/api';        
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const REGIONS = [
  { label: "지역 전체", value: "ALL" },
  { label: "강남구", value: "강남구" },
  { label: "강동구", value: "강동구" },
  { label: "강북구", value: "강북구" },
  { label: "관악구", value: "관악구" },
  { label: "광진구", value: "광진구" },
  { label: "구로구", value: "구로구" },
  { label: "금천구", value: "금천구" },
  { label: "노원구", value: "노원구" },
  { label: "도봉구", value: "도봉구" },
  { label: "동대문구", value: "동대문구" },
  { label: "동작구", value: "동작구" },
  { label: "마포구", value: "마포구" },
  { label: "서대문구", value: "서대문구" },
  { label: "서초구", value: "서초구" },
  { label: "성동구", value: "성동구" },
  { label: "성북구", value: "성북구" },
  { label: "송파구", value: "송파구" },
  { label: "양천구", value: "양천구" },
  { label: "영등포구", value: "영등포구" },
  { label: "용산구", value: "용산구" },
  { label: "은평구", value: "은평구" },
  { label: "종로구", value: "종로구" },
  { label: "중구", value: "중구" },
  { label: "중랑구", value: "중랑구" },
] as const;

export interface StudyRoomFilterProps {
  filters: Partial<StudyRoomListParams>;
  onFilterChange: (filters: Partial<StudyRoomListParams>) => void;
}

export const StudyRoomFilter = ({ filters, onFilterChange }: StudyRoomFilterProps) => {
  return (
    <div className="space-y-4 p-4 w-[220px]">
      <Select
        value={filters.locality || "ALL"}
        onValueChange={(value) => onFilterChange({ locality: value === "ALL" ? "" : value })}
      >
        <SelectTrigger className="bg-white w-full">
          <SelectValue placeholder="지역 선택" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <ScrollArea className="h-[472px]">
            {REGIONS.map((region) => (
              <SelectItem key={region.label + Math.random()} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>

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