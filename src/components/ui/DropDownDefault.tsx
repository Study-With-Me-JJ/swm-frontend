interface DropDownDefaultProps {
    options: Array<{id: number; value: string; label: string}>; 
    defaultValue: string | string[];
    onClickOption: (value: string) => void;
    onToggle: () => void;
}

export default function DropDownDefault({options,defaultValue,onClickOption,onToggle}: DropDownDefaultProps) {
    return (
        <>
            <ul className='absolute top-full left-0 w-full h-auto p-1 bg-white rounded-[8px] border border-link-default mt-[10px]' role='listbox'>
            {options.map((option) => (
                <li className=' px-[13px] py-[16px] text-[16px] font-regular hover:font-semibold text-gray-default hover:bg-[#f2f2f2] hover:cursor-pointer hover:rounded-[4px] flex items-center gap-2 justify-between flex-row-reverse relative my-[2px]' key={option.id} >
                    <input type="radio" id={option.value} name="select-option" value={option.value} className="peer absolute left-0 top-0 w-full h-full cursor-pointer opacity-0"
                    onChange={() => onClickOption(option.value)}
                    checked={defaultValue === option.value}
                    />
                    <i className={`shrink-0 block w-[20px] h-[20px] border rounded-full bg-white bg-no-repeat bg-center
                        ${defaultValue === option.value 
                            ? 'bg-link-default border-link-default bg-[url("/icons/icon_select_check.svg")]    peer-checked:bg-link-default peer-checked:border-link-default peer-checked:bg-[url("/icons/icon_select_check.svg")]' 
                            : 'border-[#c8c8c8]  '
                        }`}>
                    </i>
                <label htmlFor={option.value} className="block w-full cursor-pointer">
                    {option.label}
                </label>
                </li>
            ))}
            </ul>
        </>
    )
}