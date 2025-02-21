'use client'

import { StudyFilterProps } from '@/types/filters/study-filter';
import FilterSelect from '@/components/ui/FilterSelect';

export default function PositionFilter({type,onChange,defaultValue,options,isOpen,onToggle}:StudyFilterProps) {
  console.log('PositionFilter defaultValue before processing:', defaultValue);

  const handlePositionChange = (value: string | string[]) => {
    console.log('handlePositionChange called with:', value);

    if (Array.isArray(value) && (value.length === 0 || value.includes('ALL'))) {
      console.log('Setting to ALL');
      onChange(['ALL']);
      return;
    }
    
    onChange(value);
  };  

  const displayOptions = options.filter(option => option.value !== 'ALL');
  
  // defaultValue가 'ALL'일 때의 label 찾기
  const getDisplayValue = () => {
    console.log('getDisplayValue input:', defaultValue);

    if (defaultValue === 'ALL') {
      const allOption = options.find(option => option.value === 'ALL');
      return allOption?.label || '직무 전체';
    }
    return defaultValue;
  };

  const displayValue = getDisplayValue();
  console.log('최종 displayValue:', displayValue);
  
  return <>
      <FilterSelect type={type as "button"} onChange={handlePositionChange} defaultValue={displayValue} options={displayOptions} isOpen={isOpen} onToggle={onToggle} title='원하는 직무를 골라주세요.'/>
  </>
}