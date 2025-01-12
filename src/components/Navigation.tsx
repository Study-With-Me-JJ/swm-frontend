'use client';

import { useState } from 'react';

export default function Navigation() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const onClickCategory = (category: string) => {
        setSelectedCategory(category);

       if(selectedCategory === '프론트엔드') {
        console.log('프론트엔드');
       }
    }
    
  return (
    <div className='pt-[120px] max-w-screen-xl px-5 xl:px-0 mx-auto'>
        <h2 className='text-center text-2xl font-medium text-black '>함께 배우고 성장하며 꿈을 현실로 만드는 여정</h2>
        <div className='flex gap-[20px] justify-center items-center mt-[40px]'>
            <button onClick={() => onClickCategory('프론트엔드')} className='w-[140px] h-[140px] border border-[#e0e0e0] bg-white rounded-[16px]'>프론트엔드</button>
            <button className='w-[140px] h-[140px] border border-[#e0e0e0] bg-white rounded-[16px]'>프론트엔드</button>
            <button className='w-[140px] h-[140px] border border-[#e0e0e0] bg-white rounded-[16px]'>프론트엔드</button>
            <button className='w-[140px] h-[140px] border border-[#e0e0e0] bg-white rounded-[16px]'>프론트엔드</button>
            <button className='w-[140px] h-[140px] border border-[#e0e0e0] bg-white rounded-[16px]'>프론트엔드</button>
        </div> 
    </div>
  )
}