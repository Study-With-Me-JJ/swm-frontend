'use client'

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  helperText: string;
  errorText: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ label, type, placeholder, helperText, errorText, value, onChange }: InputFieldProps) {
        const [errorNotification, setErrorNotification] = useState<string>('');
        const [isFocused, setIsFocused] = useState<boolean>(false);

        const validateEmail = (email: string) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
          }

        const handleFocus = () => {
            setIsFocused(true);
            setErrorNotification('');
        }

        const handleBlur = () => {
            setIsFocused(false);
            if (label === '아이디' && value && !validateEmail(value)) {
                setErrorNotification('적합하지 않은 이메일 형식입니다. 다시 입력해 주세요.');
            }
        }

        useEffect(() => {
            setErrorNotification(errorText);
        }, [errorText])

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-medium'>{label}</h3>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${!isFocused && errorNotification && 'border-red-error'}
        ${!isFocused && label === '비밀번호' && value && 'border-blue-example'}
        ${!isFocused && label === '아이디' && value && validateEmail(value) && 'border-blue-example'}`} />

      {label === '아이디' && !errorNotification && <p className='text-xs text-blue-example'>{helperText}</p>}
      {!isFocused && errorNotification && <p className="text-xs text-red-error">{errorNotification}</p>}
    </div>
  );
}