'use client'

import { StudyFilterProps } from '@/types/filters/study-filter';
import FilterSelect from '@/components/ui/FilterSelect';

export default function CategoryFilter({type,onChange,defaultValue,options,isOpen,onToggle}:StudyFilterProps) {

    const handleCategoryChange = (value: string | string[]) => {
        onChange(value || 'ALL');
      };

    return <>
        <FilterSelect type={type as "default"} onChange={handleCategoryChange} defaultValue={defaultValue} options={options} isOpen={isOpen} onToggle={onToggle}   />
    </>
}