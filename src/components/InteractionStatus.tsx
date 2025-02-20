'use client'

import Image from 'next/image';
// import { useState } from 'react';
import { InteractionStatusProps } from '@/types/api/interaction';

export default function InteractionStatus({likeCount, commentCount, viewCount}: InteractionStatusProps) {
    // const [isLike, setIsLike] = useState(false);
    // const [likeCountValue, setLikeCountValue] = useState(likeCount);

    // const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     setIsLike(!isLike);
    //     setLikeCountValue(prev => isLike ? prev - 1 : prev + 1);
    // };

    return <>
        <div className='flex items-center gap-[16px] flex-shrink-0'>
            <div className='flex items-center gap-[4px]'>
                <Image src='/icons/icon_interaction_view.svg' alt='view' width={18} height={18} />
                <span className='text-sm text-semibold text-gray-default'>{viewCount}</span>
            </div>
            <div className='flex items-center gap-[4px]'>
                <Image src='/icons/icon_interaction_review.svg' alt='review' width={18} height={18} />
                <span className='text-sm text-semibold text-gray-default'>{commentCount}</span>
            </div>
            <button className='flex items-center gap-[4px]'>
                <Image src='/icons/icon_interaction_like.svg' alt='like' width={18} height={18} />
                <span className={`text-sm text-semibold text-gray-default`}>{likeCount}</span>
            </button>
        </div>
    </>
}