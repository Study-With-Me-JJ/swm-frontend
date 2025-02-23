import Image from 'next/image';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export default function ImageUploader({
  name,
  label,
  subLabel,
  onImageChange,
  previewImages,
  msg,
}: {
  name: string;
  label: string;
  subLabel: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewImages?: string[];
  msg?: string;
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
          control={control}
          name={name}
          render={() => (
            <div className="flex flex-wrap justify-start gap-[10px]">
              {previewImages?.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative h-[116px] w-[116px] overflow-hidden rounded-[8px] border border-[#e0e0e0]"
                >
                  <Image
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              <label
                htmlFor="file-upload"
                className="flex h-[116px] w-[116px] cursor-pointer items-center justify-center rounded-[8px] border border-[#e0e0e0] bg-[#f9f9f9]"
              >
                <Image
                  src="/icons/Plus.svg"
                  alt="Plus"
                  width={24}
                  height={24}
                />
              </label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                multiple
                className="hidden"
              />
            </div>
          )}
        />
        {msg && (
          <span className="font-regular text-[14px] text-red-error">{msg}</span>
        )}
      </div>
    </div>
  );
}
