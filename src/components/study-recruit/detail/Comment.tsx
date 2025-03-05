'use client';

import { getComment } from '@/lib/api/study/getComment';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function Comment({ studyId }: { studyId: string }) {
  const { data, isError } = useQuery({
    queryKey: ['comment', studyId],
    queryFn: () => getComment(studyId, 0),
  });
  console.log('Query State:', { data, isError });

  if (isError) {
    return <div>댓글 조회 실패</div>;
  }

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <div>
        {data?.data.data.map((comment) => (
          <div key={comment.commentId}>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
