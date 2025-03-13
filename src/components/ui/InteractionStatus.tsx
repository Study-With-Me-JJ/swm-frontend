'use client';

// import { deleteStudyLike } from '@/lib/api/study/postStudy';
import { addStudyLike } from '@/lib/api/study/postStudy';
import Image from 'next/image';
import { useState } from 'react';
import { InteractionStatusProps } from '@/types/api/interaction';

export default function InteractionStatus({
  likeCount,
  commentCount,
  viewCount,
  studyId,
}: InteractionStatusProps) {
  const [isLike, setIsLike] = useState(false);
  const [likeCountValue, setLikeCountValue] = useState(likeCount);

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLike(!isLike);
    setLikeCountValue((prev) => (isLike ? prev - 1 : prev + 1));

    if (isLike) {
      //   await deleteStudyLike(studyId); 
    } else {
      await addStudyLike(studyId); 
    }
  };

  return (
    <>
      <div className="flex flex-shrink-0 items-center gap-[16px]">
        <div className="flex items-center gap-[4px]">
          <Image
            src="/icons/icon_interaction_view.svg"
            alt="view"
            width={18}
            height={18}
          />
          <span className="text-semibold text-sm text-gray-default">
            {viewCount}
          </span>
        </div>
        <div className="flex items-center gap-[4px]">
          <Image
            src="/icons/icon_interaction_review.svg"
            alt="review"
            width={18}
            height={18}
          />
          <span className="text-semibold text-sm text-gray-default">
            {commentCount}
          </span>
        </div>
        <button
          type="button"
          onClick={handleLikeClick}
          className="flex items-center gap-[4px]"
        >
          <Image
            src={
              isLike
                ? '/icons/icon_interaction_like_fill.svg'
                : '/icons/icon_interaction_like.svg'
            }
            alt="like"
            width={18}
            height={18}
          />
          <span
            className={`text-semibold text-sm ${
              isLike ? 'text-link-default' : 'text-gray-default'
            }`}
          >
            {likeCount}
          </span>
        </button>
      </div>
    </>
  );
}
