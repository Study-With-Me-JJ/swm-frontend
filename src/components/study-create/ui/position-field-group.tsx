'use client';

import Image from 'next/image'; 
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { InputField } from '@/components/InputField';
import FilterSelect from '@/components/ui/FilterSelect';

interface Option {
  id: number;
  value: string;
  label: string;
}

export default function PositionFieldGroup({
  name,
  label,
  onChange,
  defaultValue,
  options,
  isOpen,
  onToggle,
  type,
}: {
  name: string;
  label: string;
  onChange: (value: string | string[]) => void;
  defaultValue: string | string[];
  options: Option[];
  isOpen: boolean;
  onToggle: () => void;
  type: 'default' | 'button';
}) {
  const { control } = useFormContext();
  const handlePositionChange = (value: string | string[]) => {
    onChange(value || 'ALL');
  };

  return (
    <>
      {label && <h3 className="font-semibold">{label} </h3>}
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name={name}
          render={() => (
            <div className="flex gap-2">
              <div className="flex-1">
                <FilterSelect
                  type={type as 'default'}
                  onChange={handlePositionChange}
                  defaultValue={defaultValue}
                  options={options}
                  isOpen={isOpen}
                  onToggle={onToggle}
                />
              </div>
              <div className="flex-1">
                <InputField
                  name={name}
                  type="text"
                  placeholder="모집 인원 (숫자로 입력해 주세요.)"
                />
              </div>
              <button
                type="button"
                className="flex h-[60px] w-[140px] flex-shrink-0 items-center justify-center gap-2 rounded-[8px] bg-link-default text-[16px] font-semibold text-white"
              >
                추가{' '}
                <Image
                  src="/icons/Add.svg"
                  alt="추가"
                  width={18}
                  height={18}
                  className="text-link-default"
                />
              </button>
            </div>
          )}
        />
      </div>
    </>
  );
}
