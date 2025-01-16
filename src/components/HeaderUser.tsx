import Link from "next/link";

export default function HeaderUser() {
    return (
        <div className='flex gap-2'>
            <button className='text-xs font-medium text-gray-default bg-[#e9e9e9] rounded-[4px] py-[6px] px-[12px]'><Link href='/join'>회원가입</Link></button>
            <button className='text-xs font-medium text-gray-default bg-[#e9e9e9] rounded-[4px] py-[6px] px-[12px]'><Link href='/login'>로그인</Link></button>
        </div>
    )
}   