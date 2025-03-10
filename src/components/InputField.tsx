'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from '@/components/ui/input';

interface InputFieldProps {
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  helperText?: string;
  maxLength?: number;
  buttonText?: string;
  onButtonClick?: () => void;
  disabled?: boolean;
  onAuthCodeCheck?: () => void; 
  value?: string;
}

export function InputField({
  name,
  label,
  type,
  placeholder,
  helperText,
  maxLength,
  buttonText,
  onButtonClick,
  disabled,
  value,
  onAuthCodeCheck, 
}: InputFieldProps) {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [isCountdownActive, setIsCountdownActive] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(600);
  const [isAuthCodeInputEnabled, setIsAuthCodeInputEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }

    return () => clearInterval(timer);
  }, [isCountdownActive, countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    if (name === 'authCode') {
      setIsCountdownActive(true);
      setCountdown(600);
      setIsAuthCodeInputEnabled(true);
    }
  };

  const handleAuthCodeCheck = () => {
    if (onAuthCodeCheck) {
      onAuthCodeCheck();
      if (getValues('authCodeVerified')) {
        setIsCountdownActive(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <h3 className="font-medium">{label}</h3>}
      <div className="flex gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const isValid = !errors[name] && field.value;
            return (
              <Input
                {...field}   
                value={value ?? field.value ?? ''}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={name === 'authCode' && !isAuthCodeInputEnabled}
                className={`flex-grow disabled:cursor-default ${
                  errors[name]
                    ? 'border-red-error'
                    : isValid
                      ? 'border-gray-light'
                      : ''
                }`}
              />
            );
          }}
        />
        {buttonText && onButtonClick && (
          <Button
            type="button"
            className="w-36 flex-shrink-0 bg-blue-default"
            onClick={handleButtonClick}
            disabled={disabled}
          >
            {buttonText}
          </Button>
        )}
      </div>
      {name === 'authCode' && (
        <Button
          type="button"
          className="bg-blue-default"
          onClick={handleAuthCodeCheck}
          disabled={!isCountdownActive}
        >
          인증번호 확인 {isCountdownActive && `(${formatTime(countdown)})`}
        </Button>
      )}
      {helperText && !errors[name] && (
        <p className="whitespace-pre-line text-xs text-blue-default">
          {helperText}
        </p>
      )}
      {errors[name] && (
        <p className="whitespace-pre-line text-xs text-red-error">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
