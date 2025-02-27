'use client';

// import Link from 'next/link';
import { useState } from 'react';
import { Study } from '@/types/api/study';
import BookMarkIcon from '@/components/ui/BookMarkIcon';
import InteractionStatus from '@/components/ui/InteractionStatus';
import Toast from '@/components/ui/Toast';

export default function StudyItem({ data }: { data: Study }) {
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
  };

  const { likeCount, commentCount, viewCount } = data;

  return (
    <>
      <div className="flex min-h-[340px] flex-col justify-between gap-[10px] rounded-[8px] bg-[#f9f9f9] px-[24px] py-[26px]">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            {data.status === 'ACTIVE' ? (
              <div className="flex h-[30px] min-w-[60px] items-center justify-center rounded-[16px] border border-link-default bg-[white] px-[12px] text-sm font-bold text-link-default">
                모집중
              </div>
            ) : (
              <div className="flex h-[30px] min-w-[60px] items-center justify-center rounded-[16px] border border-gray-light bg-[white] px-[12px] text-sm font-bold text-gray-light">
                모집마감
              </div>
            )}
            <div className="w-30 h-30">
              {/* <button onClick={handleBookmark}><Image src={isBookmark ? '/icons/icon_bookmark_on.svg' : '/icons/icon_bookmark_off.svg'} alt='북마크' width={30} height={30} /></button> */}
              <button onClick={handleBookmark}>
                <BookMarkIcon
                  color={isBookmark ? '#4998E9' : '#f9f9f9'}
                  strokeColor={isBookmark ? '#4998E9' : '#c8c8c8'}
                />
              </button>
            </div>
          </div>
          <h3 className="line-clamp-2 text-xl font-semibold text-black">
            {data.title}
          </h3>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {data.getRecruitmentPositionResponseList.map((tag) => (
              <span
                key={`${data.studyId}-${tag.recruitmentPositionId}`}
                className="flex h-[28px] min-w-[30px] items-center justify-center rounded-[4px] bg-[#eee] px-[7px] text-xs font-[500] text-gray-default"
              >
                {tag.title}
                <span className="ml-1 text-link-default">{tag.headcount}</span>
              </span>
            ))}
          </div>
          <p className="text-regular line-clamp-2 text-sm text-[#828282]">
            {data.content}
          </p>
        </div>
        <div className="flex items-end justify-between gap-[16px]">
          <div className="flex flex-wrap items-center gap-1">
            {data.getTagResponseList.map((item) => (
              <span
                key={`${item.tagId}-${item.name}`}
                className="flex h-[26px] min-w-[30px] items-center justify-center rounded-[4px] border border-[#eee] bg-white px-[7px] text-[10px] font-[500] text-[#a5a5a5]"
              >
                #{item.name}
              </span>
            ))}
          </div>
          <InteractionStatus
            likeCount={likeCount}
            commentCount={commentCount}
            viewCount={viewCount}
          />
        </div>
      </div>
      <Toast
        isToast={isToast}
        message={isBookmark ? '스터디 북마크 완료!' : '스터디 북마크 해제'}
        url={isBookmark ? '/study-recruit' : '/study-recruit'}
        urlText="내 북마크 보기"
        active={isBookmark}
        icon={
          isBookmark
            ? '/icons/icon_bookmark_on.svg'
            : '/icons/icon_bookmark_off.svg'
        }
      />
    </>
  );
}
