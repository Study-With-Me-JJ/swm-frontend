'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import HeaderUser from './HeaderUser';
import Image from 'next/image';
export default function Header() {
  const path = usePathname();

  const logo = '/icons/swm_logo.svg';

  const navList = [
    { name: '스터디 모집', href: '/study-recruit' },
    { name: '스터디 룸', href: '/studyroom' },
    { name: '외부 스터디 룸', href: '/external-studyrooms' },
    { name: '외부 스터디', href: '/external-studies' },
  ];

  return (
   <div className='border-b-2 border-border'>
      <div className='flex justify-between items-center py-5 max-w-screen-xl px-5 xl:px-0 mx-auto'>
        <div className='flex items-center gap-5'>
          <h2 className='font-semibold text-2xl text-black w-[197px]'><Link href='/'><Image src={logo} alt='study with me logo' width={182} height={28} /></Link></h2> 
          <ul className='flex items-center'>
            {navList.map((nav, index) => (
              <li key={index} className='px-4'><Link href={nav.href} className={`text-base font-medium text-gray-default ${path === nav.href ? "text-primary-default" : ""}`}>{nav.name}</Link></li>
            ))} 
            </ul>
        </div>
        <HeaderUser />
      </div>
    </div>
  );    
}   