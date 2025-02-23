'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export default function RadioSelectGroup({
  label,
  subLabel,
  name,
  options,
  onOptionChange,
}: {
  label: string;
  subLabel: string;
  name: string;
  options: { id: number; name: string }[];
  onOptionChange: (id: number) => void;
}) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <h3 className="font-semibold">
          {label}{' '}
          <span className="ml-[12px] text-[12px] font-medium text-[#bbbbbb]">
            {subLabel}
          </span>
        </h3>
      )}
      <div className="flex flex-col gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <div className="flex flex-wrap justify-start gap-2">
                {options.map((item) => (
                  <div key={item.id} className="relative">
                    <Input
                      type="radio"
                      checked={field.value === item.id}
                      id={item.id.toString()}
                      onChange={() => {
                        field.onChange(item.id);
                        onOptionChange(item.id);
                      }}
                      className="peer absolute h-0 w-0 opacity-0"
                    />
                    <label
                      htmlFor={item.id.toString()}
                      className="border-box flex min-w-[60px] cursor-pointer items-center justify-center rounded-[8px] border border-[#E0E0E0] p-[16px] text-[16px] font-medium text-[#bbbbbb] hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600"
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
