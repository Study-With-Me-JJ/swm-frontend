"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
interface DropDownButtonProps {
    options: Array<{id: number; value: string; label: string}>; 
    defaultValue: string | string[]   
    onClickOption: (value: string[]) => void;
    title?: string; 
    onToggle?: () => void; 
    onChange?: (value: string[]) => void; 
    position?: {
        left?: string;
        right?: string;
    };  
}
interface Option {
    id: number;
    value: string;
    label: string;
}
export default function DropDownButton({options,defaultValue,onClickOption,title,onToggle,onChange,position={left: 'left-0', right: 'right-0'}}: DropDownButtonProps) {

    const [checkOption, setCheckOption] = useState<Option[]>([]); 
    // const defaultOption = options.filter(option => 
    //     Array.isArray(defaultValue) 
    //         ? defaultValue.includes(option.value)
    //         : option.value === defaultValue
    // ); 

    useEffect(() => { 
        const currentOptions = options.filter(option => 
            Array.isArray(defaultValue) 
                ? defaultValue.includes(option.value)
                : option.value === defaultValue
        );
        setCheckOption(currentOptions);
    }, [defaultValue, options]);

    const onClickApply = () => {
        const selectedValues = checkOption.map((option) => option.value);
        onClickOption(selectedValues);
        onChange?.(selectedValues);   
        onToggle?.();
    } 

    const selectOption = (option: Option) => {  
        if(!checkOption.some(item => item.id === option.id)){
            const newCheckOption = [...checkOption, option];
            setCheckOption(newCheckOption); 
            onChange?.(newCheckOption.map(o => o.value));
        } else {
            const updatedOptions = checkOption.filter(item => item.id !== option.id);
            setCheckOption(updatedOptions); 
            onChange?.(updatedOptions.map(o => o.value));
        }
    };

    const removeOption = (option: Option) => {  
        const updatedOptions = checkOption.filter((item) => item.id !== option.id);
        setCheckOption(updatedOptions); 
        onChange?.(updatedOptions.map(o => o.value));
    } 

    const handleReset = () => {
        setCheckOption([]);
        onChange?.([]);  
    }

    return (
        <>
            <div className={`dropdown-button-content absolute ${position.left} ${position.right} w-fit h-auto py-[40px] px-[30px] bg-white rounded-[8px] border border-link-default mt-[10px]`}>
                <h3 className='text-sm font-semibold text-gray-default mb-[24px] text-center'>{title}</h3>
                <ul role='listbox' className='flex flex-wrap gap-[10px] w-[380px]'>
                {options.map((option: Option) => (
                    <li className='relative overflow-hidden w-[120px] h-[40px] flex items-center justify-center border border-[#c8c8c8] rounded-[4px]' key={option.id} >
                        <input className="peer absolute left-0 top-0 w-full h-full cursor-pointer opacity-0" type="checkbox" id={option.value} name="select-option" value={option.value} 
                        onChange={() => selectOption(option)}
                        checked={checkOption.some(item => item.id === option.id)}
                        /> 
                        <label htmlFor={option.value} className="w-full cursor-pointer text-center h-full flex items-center justify-center peer-checked:bg-black peer-checked:border-black peer-checked:text-white text-xs font-[500] text-[#c8c8c8] "> {option.label}</label>
                    </li>
                ))}
                </ul> 
                <ul className="my-[24px] flex flex-wrap gap-2 w-[380px]">{checkOption.map((option) => (
                    <li className='flex items-center justify-center gap-1 px-[7px] h-[28px] bg-[#eee] rounded-[4px] text-xs font-[500] text-[#a5a5a5]' key={option.id}>{option.label}
                    <button> <Image src="/icons/icon_delete.svg" alt="삭제" width={18} height={18} className="cursor-pointer" onClick={() => removeOption(option)} aria-label={`${option.label} 삭제`} />
                    </button>
                    </li>
                ))}</ul> 
                <div className="flex gap-[10px] justify-end">
                    <button onClick={handleReset} className="shrink-0 w-[120px] h-[40px] bg-[#E7F3FF]  rounded-[4px] text-sm font-semibold text-link-default">초기화</button>
                    <button onClick={onClickApply} className='w-full h-[40px] bg-link-default text-white rounded-[4px] text-sm font-semibold'>적용</button>
                </div>
            </div>
        </>
    )
}