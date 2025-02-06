'use client'

import { Study } from '@/types/api/study';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Tag from './Tag';
import Toast from './ui/Toast';

export default function StudyItem({data}: {data: Study}) {
    const [isBookmark, setIsBookmark] = useState(false);
    const [isToast, setIsToast] = useState(false);

    const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setIsBookmark(!isBookmark);
        setIsToast(true);
        setTimeout(() => {
            setIsToast(false);
        }, 3000);
    }

    return <>
        <Link href={`/study-detail/${data.studyId}`} className='py-[26px] px-[24px] bg-[#f9f9f9] rounded-[8px] flex flex-col justify-between gap-[10px] h-[340px]'>
            <div className='flex gap-4 flex-col h-full'>
                <div className='flex items-center justify-between'>
                    {data.status === 'ACTIVE' ? <div className='min-w-[60px] h-[30px] bg-[white] text-link-default rounded-[16px] flex items-center justify-center border border-link-default text-sm font-bold px-[12px]'>모집중</div> : <div className='min-w-[60px] h-[30px] bg-[white] text-gray-light rounded-[16px] flex items-center justify-center border border-gray-light text-sm font-bold px-[12px]'>모집마감</div>}
                    <div><button onClick={handleBookmark}><Image src={isBookmark ? '/icons/icon_bookmark_on.svg' : '/icons/icon_bookmark_off.svg'} alt='북마크' width={30} height={30} /></button></div>
                </div>
                <h3 className='text-xl font-semibold text-black line-clamp-2'>{data.title}</h3>
                <div className='flex gap-2 flex-wrap items-center justify-start'>
                    {data.tagInquiryListResponse.map((tag) => ( //추후 직무 태그 추가
                        <span key={tag.studyTagId} className='min-w-[30px] h-[28px] bg-[#e9e9e9] rounded-[4px] px-[7px] flex items-center justify-center text-xs font-[500] text-gray-default'>{tag.name}</span>
                    ))}
                </div>
                <p className='text-sm text-regular text-[#828282] line-clamp-2'>{data.content}</p>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Tag tag={data.tagInquiryListResponse[0].name} />
                </div>
            </div>
        </Link>
        <Toast isToast={isToast} message={isBookmark ? '북마크에 추가되었습니다.' : '북마크에서 삭제되었습니다.'} />
    </>
}