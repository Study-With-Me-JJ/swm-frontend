'use client'

import { StudyFilterProps } from '@/types/filters/study-filter';
import FilterSelect from '@/components/ui/FilterSelect';

export default function StatusFilter({type,onChange,defaultValue,options,isOpen,onToggle}:StudyFilterProps) {
    const handleStatusChange = (value: string | string[]) => {
        onChange(value || 'ALL');
    };

    return <>
        <FilterSelect type={type as "default"} onChange={handleStatusChange} defaultValue={defaultValue} options={options} isOpen={isOpen} onToggle={onToggle} />
    </>
}