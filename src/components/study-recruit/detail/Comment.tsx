'use client';

import { getComment } from '@/lib/api/study/getComment';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Suspense } from 'react';
import CommentForm from './CommentForm';

export default function Comment({ studyId }: { studyId: string }) {
  const { data, isError } = useQuery({
    queryKey: ['comment', studyId],
    queryFn: () => getComment(studyId, 0),
  });
  console.log('Query State:', { data, isError });

  const formatDate = (dateInput: number[] | string) => {
    try {
      const dateArray =
        typeof dateInput === 'string' ? JSON.parse(dateInput) : dateInput;

      const [year, month, day, hour, minute] = dateArray;
      const date = new Date(year, month - 1, day, hour, minute);
      return date
        .toLocaleDateString('ko-KR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(/\. /g, '.')
        .replace(/\.$/, '');
    } catch (error) {
      console.error('날짜 파싱 오류:', error);
      return '날짜 형식 오류';
    }
  };

  if (isError) {
    return <div>댓글 조회 실패</div>;
  }

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <div>
        {data?.data.data.map((comment) => (
          <div
            key={comment.commentId}
            className="flex flex-col gap-[16px] pb-[24px] pt-[32px]"
          >
            <div className="flex items-center gap-[4px]">
              <Image
                src="/icons/icon_no_profile.svg"
                alt="user"
                width={18}
                height={18}
              />
              <p className="text-[14px] font-bold text-link-default">
                {comment.nickname}
              </p>
            </div>
            <p className="font-regular text-[14px] text-black">
              {comment.content}
            </p>
            <div className="flex items-center justify-between">
              <p className="font-regular text-[14px] text-gray-light">
                {formatDate(comment.createdAt)}
              </p>
              <button className="flex items-center gap-[4px]">
                <Image
                  src="/icons/Favorite.svg"
                  alt="favorite"
                  width={18}
                  height={18}
                />
                {/* <p className="font-regular text-[14px] text-gray-light">
                  {comment.likeCount}
                </p> */}
              </button>
            </div>
          </div>
        ))}
      </div>
      <CommentForm studyId={studyId} />
    </Suspense>
  );
}
