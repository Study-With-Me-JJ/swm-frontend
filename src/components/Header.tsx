'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import HeaderUser from './HeaderUser';

export default function Header() {
  const path = usePathname();

  return (
   <div className='border-b-2 border-border'>
      <div className='flex justify-between items-center py-5 max-w-screen-xl px-5 xl:px-0 mx-auto'>
        <div className='flex items-center gap-5'>
          <h2 className='font-semibold text-2xl text-black w-[197px]'><Link href='/'>Study with me</Link></h2> 
          <ul className='flex items-center'>
            <li className='px-4'><Link href='/study-recruit' className={`text-base font-medium text-gray-default ${path === "/study-recruit" ? "text-primary-default" : ""}`}>스터디 모집</Link></li>
            <li className='px-4'><Link href='/studyroom' className={`text-base font-medium text-gray-default ${path === "/studyroom" ? "text-primary-default" : ""}`}>스터디 룸</Link></li>
            <li className='px-4'><Link href='/external-studyrooms' className={`text-base font-medium text-gray-default ${path === "/external-studyrooms" ? "text-primary-default" : ""}`}>외부 스터디 룸</Link></li>     
            <li className='px-4'><Link href='/external-studies' className={`text-base font-medium text-gray-default ${path === "/external-studies" ? "text-primary-default" : ""}`}>외부 스터디</Link></li>
            </ul>
        </div>
        <HeaderUser />
      </div>
    </div>
  );    
}   