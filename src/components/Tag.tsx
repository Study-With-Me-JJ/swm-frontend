import Image from 'next/image';

export default function Tag({ tag }: { tag: string }) {
    return <span className='min-w-[30px] h-[28px] bg-[#e9e9e9] rounded-[4px] px-[7px] flex items-center justify-center text-xs font-[500] text-gray-default'><Image src='/icons/icon_user.svg' alt='유저' width={20} height={20} />{tag}</span>
}
