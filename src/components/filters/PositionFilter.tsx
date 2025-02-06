'use client'

import { StudyFilterProps } from '@/types/filters/study-filter';
import FilterSelect from '@/components/ui/FilterSelect';

export default function PositionFilter({type,onChange,defaultValue,options,isOpen,onToggle}:StudyFilterProps) {
    const handlePositionChange = (value: string | string[]) => {
    if (Array.isArray(value) && value.length === 0) {
      onChange(['ALL']);
      return;
    }
    onChange(value || 'ALL');
  };

    return <>
        <FilterSelect type={type as "button"} onChange={handlePositionChange} defaultValue={defaultValue} options={options} isOpen={isOpen} onToggle={onToggle} />
    </>
}