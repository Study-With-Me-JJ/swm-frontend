'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SelectProps {
    options: Array<{ value: string; label: string }>;
    defaultValue?: string;
    onChange?: (value: string) => void;
    className?: string;
    placeholder?: string;
  }

export default function FilterSelect({ options, defaultValue, onChange, className, placeholder }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative'>
            <button className={`min-w-[220px] flex justify-between gap-1 px-[13px] items-center h-[50px] text-[16px] font-semibold text-gray-default border rounded-[8px] ${
                isOpen ? 'border-link-default' : 'border-gray-disabled'
              }`} onClick={() => setIsOpen(!isOpen)}>
              <span>{defaultValue || placeholder}</span>
              <Image src="/icons/icon_select_arrow.svg" alt="arrow-right" width={28} height={28}/>
            </button>
            {isOpen && (
              <ul className='absolute top-full left-0 w-full h-auto p-1 bg-white rounded-[8px] border border-link-default mt-[10px]' role='listbox'>
                {options.map((option) => (
                    <li className='px-[13px] py-[16px] text-[16px] font-semibold text-gray-default' key={option.value} onClick={() => {
                        onChange?.(option.value);
                        setIsOpen(false);
                    }}>{option.label}</li>
                ))}
              </ul>
            )}
        </div>
    )
}