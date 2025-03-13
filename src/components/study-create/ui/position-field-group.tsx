'use client';

import Image from 'next/image';
import FilterSelect from '@/components/ui/FilterSelect';

interface Option {
  id: number;
  value: string;
  label: string;
}

export default function PositionFieldGroup({
  onChange,
  options,
  isOpen,
  onToggle,
  type,
  isLastField,
  onAdd,
  onDelete,
  onCapacityChange,
  capacity,
  value,
  disabled,
}: {
  name: string;
  onChange: (value: string | string[]) => void;
  options: Option[];
  isOpen: boolean;
  onToggle: () => void;
  type: 'default' | 'button';
  isLastField: boolean;
  onAdd: () => void;
  onDelete: () => void;
  onCapacityChange: (value: number) => void;
  value: string; //직무 선택값
  capacity: number | null; //모집 인원
  id: string;
  disabled: boolean;
}) {
  const handlePositionChange = (value: string | string[]) => {
    onChange(value || 'ALL');
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <FilterSelect
              type={type as 'default'}
              onChange={handlePositionChange}
              defaultValue={value}
              options={options}
              isOpen={isOpen}
              onToggle={onToggle}
              disabled={disabled}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="h-[60px] w-full rounded-lg border border-gray-300 px-4"
              placeholder="모집 인원 (숫자로 입력해 주세요.)"
              value={capacity ? capacity.toString() : ''}
              onChange={(e) => onCapacityChange(Number(e.target.value))}
              disabled={disabled}
            />
          </div>
          <button
            type="button"
            onClick={isLastField ? onAdd : onDelete}
            disabled={disabled}
            className={`flex h-[60px] w-[140px] flex-shrink-0 items-center justify-center gap-2 rounded-[8px] ${
              isLastField
                ? 'bg-link-default text-white'
                : 'border border-[#e0e0e0] bg-[#f9f9f9] text-[#6e6e6e]'
            } text-[16px] font-semibold`}
          >
            {isLastField ? (
              <>
                추가{' '}
                <Image src="/icons/Add.svg" alt="추가" width={18} height={18} />
              </>
            ) : (
              <>
                삭제{' '}
                <Image
                  src="/icons/Clear.svg"
                  alt="삭제"
                  width={18}
                  height={18}
                />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
