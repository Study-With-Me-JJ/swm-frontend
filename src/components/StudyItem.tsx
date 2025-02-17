'use client'

import { Study } from '@/types/api/study';
import { useState } from 'react';
import Link from 'next/link'; 
import Toast from './ui/Toast';
import BookMarkIcon from './ui/BookMarkIcon';
import InteractionStatus from './InteractionStatus'; 

export default function StudyItem({data}: {data: Study}) {
    const [isBookmark, setIsBookmark] = useState(false);
    const [isToast, setIsToast] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (timerId) {
            clearTimeout(timerId);
        }

        setIsBookmark(!isBookmark);
        setIsToast(true);

       const newTimerId = setTimeout(() => {
            setIsToast(false);
        }, 2000);
        setTimerId(newTimerId);
    }

    const {likeCount, commentCount, viewCount} = data;

    return <>
        <Link href={`/study-detail/${data.studyId}`} className='py-[26px] px-[24px] bg-[#f9f9f9] rounded-[8px] flex flex-col justify-between gap-[10px] h-[340px]'>
            <div className='flex gap-4 flex-col h-full'>
                <div className='flex items-center justify-between'>
                    {data.status === 'ACTIVE' ? <div className='min-w-[60px] h-[30px] bg-[white] text-link-default rounded-[16px] flex items-center justify-center border border-link-default text-sm font-bold px-[12px]'>모집중</div> : <div className='min-w-[60px] h-[30px] bg-[white] text-gray-light rounded-[16px] flex items-center justify-center border border-gray-light text-sm font-bold px-[12px]'>모집마감</div>}
                    <div className='w-30 h-30'>
                        {/* <button onClick={handleBookmark}><Image src={isBookmark ? '/icons/icon_bookmark_on.svg' : '/icons/icon_bookmark_off.svg'} alt='북마크' width={30} height={30} /></button> */}
                        <button onClick={handleBookmark}><BookMarkIcon color={isBookmark ? '#4998E9' : '#f9f9f9'} strokeColor={isBookmark ? '#4998E9' : '#c8c8c8'} /></button>
                    </div>
                </div>
                <h3 className='text-xl font-semibold text-black line-clamp-2'>{data.title}</h3>
                <div className='flex gap-2 flex-wrap items-center justify-start'>
                    {data.getRecruitmentPositionResponseList.map((tag) => (
                        <span key={tag.title} className='min-w-[30px] h-[28px] bg-[#eee] rounded-[4px] px-[7px] flex items-center justify-center text-xs font-[500] text-gray-default'>{tag.title}<span className='text-link-default ml-1'>{tag.headcount}</span></span>
                    ))}
                </div>
                <p className='text-sm text-regular text-[#828282] line-clamp-2'>{data.content}</p>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>  
                    {data.getTagResponseList.map((item)=>(
                        <span key={item.tagId} className='min-w-[30px] h-[26px] rounded-[4px] px-[7px] flex items-center justify-center text-[10px] font-[500] border border-[#eee] bg-white text-[#a5a5a5]'>{item.name}</span>
                    ))}
                </div>
                <InteractionStatus likeCount={likeCount} commentCount={commentCount} viewCount={viewCount} />
            </div>
        </Link>
        <Toast isToast={isToast} message={isBookmark ? '스터디 북마크 완료!' : '스터디 북마크 해제'}  url={isBookmark ? '/study-recruit' : '/study-recruit'} urlText='내 북마크 보기' active={isBookmark} icon={isBookmark ? '/icons/icon_bookmark_on.svg' : '/icons/icon_bookmark_off.svg'}/>
    </>
}