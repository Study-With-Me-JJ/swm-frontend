import { AlignRight, Filter } from 'lucide-react';
import { StudyRoomListParams, SortCriteria } from '@/types/api';        
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { RangeSlider } from '@/components/ui/range-slider';
import { LocalitySelect, LocalitySelectContent, LocalitySelectItem, LocalitySelectTrigger, LocalitySelectValue } from '@/components/ui/locality-select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

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
  const [priceRange, setPriceRange] = useState([
    filters.minPricePerHour || 0,
    filters.maxPricePerHour || 300000
  ]);
  const [headCountRange, setHeadCountRange] = useState([
    1,
    filters.headCount || 50
  ]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleApplyPrice = () => {
    onFilterChange({
      minPricePerHour: priceRange[0],
      maxPricePerHour: priceRange[1]
    });
  };

  const handleResetPrice = () => {
    setPriceRange([0, 300000]);
    onFilterChange({
      minPricePerHour: undefined,
      maxPricePerHour: undefined
    });
  };

  const handleHeadCountChange = (values: number[]) => {
    setHeadCountRange(values);
  };

  const handleApplyHeadCount = () => {
    onFilterChange({ headCount: headCountRange[1] });
  };  

  const handleResetHeadCount = () => {
    setHeadCountRange([1, 30]);
    onFilterChange({ headCount: undefined });
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-[20px]">
        <LocalitySelect
        value={filters.locality || "ALL"}
        onValueChange={(value) => onFilterChange({ locality: value === "ALL" ? "" : value })}
      >
        <LocalitySelectTrigger className="bg-white w-[220px] h-[50px]">
          <LocalitySelectValue placeholder="지역" />
        </LocalitySelectTrigger>
        <LocalitySelectContent className="bg-white w-[220px]">
          <ScrollArea className="h-[472px]">
            {REGIONS.map((region) => (
              <LocalitySelectItem key={region.label + Math.random()} value={region.value}>
                {region.label}
              </LocalitySelectItem>
            ))}
          </ScrollArea>
        </LocalitySelectContent>
      </LocalitySelect>

      <Select value="price">
        <SelectTrigger className="bg-white w-[220px] h-[50px]">
          <SelectValue placeholder="가격" />
        </SelectTrigger>
        
        <SelectContent className="bg-white w-[340px] h-[238px] rounded-[8px]">
          <div className="space-y-7 px-[30px] py-[40px] flex flex-col justify-center items-center h-full">
            <div className="text-center">
              <h3 className="text-[14px] font-[600] text-[#565656] mb-2">가격을 설정해 주세요.</h3>
              <p className="text-[#565656] text-[20px] font-[600]">
                {priceRange[0].toLocaleString()}원 ~ {priceRange[1].toLocaleString()}원
              </p>
            </div>

            <RangeSlider
              defaultValue={[0, 300000]}
              min={0}
              max={300000}
              step={1000}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="[&_[role=slider]]:border-[#E0E0E0]"
              minStepsBetweenThumbs={1}
            />

            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="bg-[#E7F3FF] text-[#4998E9] font-[600] hover:bg-[#E7F3FF]/90 border-0 flex-shrink-0 w-[80px]"
                onClick={handleResetPrice}
              >
                초기화
              </Button>
              <Button
                className="bg-[#4998E9] text-white font-[600] hover:bg-[#4998E9]/90 flex-grow-1 w-full"
                onClick={handleApplyPrice}
              >
                적용
              </Button>
            </div>
          </div>
        </SelectContent>
      </Select>

      <Select value={filters.headCount?.toString() || "0"}>
        <SelectTrigger className="bg-white w-[220px] h-[50px]">
          <SelectValue placeholder="인원" />
        </SelectTrigger>
        
        <SelectContent className="bg-white w-[340px] h-[238px] rounded-[8px]">
          <div className="space-y-7 px-[30px] py-[40px] flex flex-col justify-center items-center h-full">
            <div className="text-center">
              <h3 className="text-[14px] font-[600] text-[#565656] mb-2">인원을 설정해 주세요.</h3>
              <p className="text-[#565656] text-[20px] font-[600]">
                {headCountRange[0].toLocaleString()}명 ~ {headCountRange[1].toLocaleString()}명
              </p>
            </div>

            <RangeSlider
              defaultValue={[1, 50]}
              min={1}
              max={50}
              step={1}
              value={headCountRange}
              onValueChange={handleHeadCountChange}
              className="[&_[role=slider]]:border-[#E0E0E0]"
              minStepsBetweenThumbs={1}
            />

            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="bg-[#E7F3FF] text-[#4998E9] font-[600] hover:bg-[#E7F3FF]/90 border-0 flex-shrink-0 w-[80px]"
                onClick={handleResetHeadCount}
              >
                초기화
              </Button>
              <Button
                className="bg-[#4998E9] text-white font-[600] hover:bg-[#4998E9]/90 flex-grow-1 w-full"
                onClick={handleApplyHeadCount}
              >
                적용
              </Button>
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
    <div>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className='w-[18px] h-[18px]' />
        </Button> 
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>  
      <Select value={filters.sortCriteria || "STARS"} onValueChange={(value) => onFilterChange({ sortCriteria: value as SortCriteria })}>
        <SelectTrigger hideChevron className="bg-white font-[600] text-[14px] text-[#4998E9] flex gap-2 items-center border-0">
          <AlignRight className='w-[18px] h-[18px]' />
          <SelectValue placeholder="평점순" />
        </SelectTrigger>
        <SelectContent className="bg-white w-[95px]">
          <SelectGroup>
            <SelectItem hideCheck value={SortCriteria.STAR} className="font-[600] h-[35px] pl-[16px] data-[state=checked]:text-[#4998E9] data-[state=unchecked]:text-[#C8C8C8]">평점순</SelectItem>
            <SelectItem hideCheck value={SortCriteria.LIKE} className="font-[600] h-[35px] pl-[16px] data-[state=checked]:text-[#4998E9] data-[state=unchecked]:text-[#C8C8C8]">좋아요순</SelectItem>
            <SelectItem hideCheck value={SortCriteria.REVIEW} className="font-[600] h-[35px] pl-[16px] data-[state=checked]:text-[#4998E9] data-[state=unchecked]:text-[#C8C8C8]">후기순</SelectItem>
            <SelectItem hideCheck value={SortCriteria.PRICE_ASC} className="font-[600] h-[35px] pl-[16px] data-[state=checked]:text-[#4998E9] data-[state=unchecked]:text-[#C8C8C8]">가격 오름차순</SelectItem>
            <SelectItem hideCheck value={SortCriteria.PRICE_DESC} className="font-[600] h-[35px] pl-[16px] data-[state=checked]:text-[#4998E9] data-[state=unchecked]:text-[#C8C8C8]">가격 내림차순</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
);  
}; 