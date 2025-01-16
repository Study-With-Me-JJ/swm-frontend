import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  helperText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ label, type, placeholder, helperText, value, onChange }: InputFieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-medium'>{label}</h3>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {helperText && <p className='text-xs text-blue-example'>{helperText}</p>}
    </div>
  );
}