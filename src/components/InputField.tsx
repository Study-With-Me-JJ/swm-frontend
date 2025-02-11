'use client'

import { Input } from "@/components/ui/input";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "./ui/button";

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  helperText?: string;
  maxLength?: number;
  buttonText?: string;
}


export function InputField({ name, label, type, placeholder, helperText, maxLength, buttonText }: InputFieldProps) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-medium'>{label}</h3>
      <div className='flex gap-2'>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const isValid = !errors[name] && field.value;
          return (
          <Input
            {...field}
            value={field.value ?? ''}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`flex-grow
              ${errors[name]
              ? 'border-red-error'
              : isValid
              ? 'border-gray-light'
              : ''}
            `}
          />
        );
      }}
      />
      {buttonText && <Button className="bg-blue-default w-36 flex-shrink-0">{buttonText}</Button>}
</div>
      {helperText && !errors[name] && <p className='text-xs text-blue-default whitespace-pre-line'>{helperText}</p>}
      {errors[name] && <p className="text-xs text-red-error whitespace-pre-line">{errors[name]?.message?.toString()}</p>}
    </div>

  );
}