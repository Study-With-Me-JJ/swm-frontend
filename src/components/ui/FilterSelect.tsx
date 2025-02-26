'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import DropDownButton from './DropDownButton';
import DropDownDefault from './DropDownDefault';

interface Option {
  id: number;
  value: string;
  label: string;
}

interface FilterSelectProps {
  onChange: (value: string | string[]) => void;
  defaultValue: string | string[];
  options: Option[];
  isOpen: boolean;
  onToggle: () => void;
  type?: 'default' | 'button';
  title?: string;
  closeOnSelect?: boolean;
}

export default function FilterSelect({
  options,
  defaultValue,
  onChange,
  onToggle,
  isOpen,
  type = 'default',
  title = 'default',
  closeOnSelect = true,
}: FilterSelectProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('.dropdown-button-content')
      ) {
        return;
      }
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          onToggle();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const onClickOption = (value: string | string[]) => {
    if (type === 'button') {
      //버튼타입 드롭다운
      onChange?.(value as string[]);
    } else {
      //기본타입 드롭다운
      onChange?.(value as string);
      if (closeOnSelect) {
        onToggle();
      }
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-inherit relative h-full" ref={containerRef}>
      <button
        className={`flex h-full w-full items-center justify-between gap-1 rounded-[8px] border px-[13px] text-[16px] font-semibold text-gray-default ${
          isOpen ? 'border-link-default' : 'border-gray-disabled'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <span className="max-w-[calc(100%-40px)] overflow-hidden text-ellipsis whitespace-nowrap">
          {Array.isArray(defaultValue)
            ? defaultValue
                .map(
                  (value) =>
                    options.find((option) => option.value === value)?.label,
                )
                .join(', ')
            : typeof defaultValue === 'string' && defaultValue.includes('전체')
              ? defaultValue
              : options.find((option) => option.value === defaultValue)?.label}
        </span>
        <Image
          src={
            isOpen
              ? '/icons/icon_select_arrow_up.svg'
              : '/icons/icon_select_arrow.svg'
          }
          alt="arrow-right"
          width={28}
          height={28}
        />
      </button>
      {isOpen && renderDropDown()}
    </div>
  );

  function renderDropDown() {
    switch (type) {
      case 'default':
        return (
          <DropDownDefault
            options={options}
            defaultValue={defaultValue as string}
            onClickOption={onClickOption}
            onToggle={onToggle}
          />
        );
      case 'button':
        return (
          <DropDownButton
            options={options}
            defaultValue={defaultValue as string[]}
            onClickOption={onClickOption}
            title={title}
            onToggle={onToggle}
          />
        );
      default:
        return null;
    }
  }
}
