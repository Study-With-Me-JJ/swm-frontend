'use client';

import { getUserInfo } from '@/lib/api/auth';
import { getComment, getReply } from '@/lib/api/study/getComment';
import { postReply } from '@/lib/api/study/postComment';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import CommentForm from './CommentForm';
import { ApiReplyResponse, Reply } from '@/types/api/study-recruit/getReply';
import Toast from '@/components/ui/Toast';

export default function Comment({ studyId }: { studyId: string }) {
  const [page, setPage] = useState(0);

  const { data: comments, isError } = useQuery({
    queryKey: ['comment', studyId, page],
    queryFn: () => getComment(studyId, page),
  });

  const { data: user } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });

  const [parentId, setParentId] = useState<string>('');

  const { data: allReplies } = useInfiniteQuery<ApiReplyResponse<Reply>[]>({
    queryKey: ['replies', comments?.data?.data?.map((c) => c.commentId)],
    initialPageParam: { lastReplyId: 0 },
    queryFn: async () => {
      if (!comments?.data?.data) return [];
      return Promise.all(
        comments.data.data.map((comment) =>
          getReply(String(comment.commentId), { lastReplyId: 0 }),
        ),
      );
    },
    enabled: !!comments?.data?.data,

    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const hasMore = lastPage.some((reply) => reply.data.data.length > 0);
      return hasMore ? lastPage[0]?.data?.data[0]?.commentId : undefined;
    },
  });

  const getRepliesForComment = (commentId: string, index: number) => {
    const replies = allReplies?.pages?.[0] as
      | ApiReplyResponse<Reply>[]
      | undefined;
    return replies?.[index]?.data?.data || [];
  };

  const router = useRouter();
  const queryClient = useQueryClient();
  const [isToast, setIsToast] = useState(false);
  const [message, setMessage] = useState('');

  const [replyContent, setReplyContent] = useState('');
  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
  };

  const { mutate: submitReply } = useMutation({
    mutationFn: () => postReply(studyId, parentId, replyContent),
    onSuccess: (response) => {
      if (response.message === 'Expired Token') {
        setIsToast(true);
        setMessage('로그인이 만료되었습니다. 다시 로그인해주세요.');
        router.push('/login');
        return;
      }

      console.log('답글 작성 성공', response);
      setReplyContent('');
      setParentId('');
      setShowReplyId(null);
      queryClient.invalidateQueries({ queryKey: ['replies'] });
      //   console.log('답글 작성 성공');
      setIsToast(true);
      setMessage('답글이 작성되었습니다.');
    },
    onError: (error) => {
      console.error('API Error:', error);
      setIsToast(true);
      setMessage('답글 작성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  //   console.log('Query State:', { comments, isError });
  //   console.log('allReplies', allReplies);

  const [showReplyId, setShowReplyId] = useState<string | null>(null);
  const handleReplyClick = (commentId: string) => {
    setParentId(String(commentId));
    setShowReplyId(String(commentId));
  };

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

  const [visibleReplyCounts, setVisibleReplyCounts] = useState<{
    [key: string]: number;
  }>({});

  const getVisibleReplies = (commentId: string, replies: Reply[]) => {
    const visibleCount = visibleReplyCounts[commentId] || 3;
    return replies.slice(0, visibleCount);
  };

  const handleLoadMore = (commentId: string) => {
    setVisibleReplyCounts((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 3) + 3,
    }));
  };

  if (isError) {
    return <div>댓글 조회 실패</div>;
  }

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <div>
        {comments?.data.data.map((comment, index) => {
          const commentReplies = getRepliesForComment(
            String(comment.commentId),
            index,
          );
          const visibleReplies = getVisibleReplies(
            String(comment.commentId),
            commentReplies,
          );
          const hasMoreReplies = commentReplies.length > visibleReplies.length;

          return (
            <div key={comment.commentId}>
              <div className="flex flex-col gap-[16px] border-b border-gray-disabled py-[24px]">
                <div className="flex items-center justify-between">
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
                  {comment.nickname === user?.data?.nickname && (
                    <div className="flex items-center gap-[4px]">
                      <button
                        type="button"
                        className="flex h-[33px] w-[63px] cursor-pointer items-center justify-center gap-[2px] rounded-[4px] border border-gray-disabled bg-[#f9f9f9] text-[14px] font-medium text-[#6e6e6e]"
                      >
                        <Image
                          src="/icons/Edit-deepgray.svg"
                          alt="수정"
                          width={16}
                          height={16}
                        />
                        수정
                      </button>
                      <button
                        type="button"
                        className="flex h-[33px] w-[63px] cursor-pointer items-center justify-center gap-[2px] rounded-[4px] border border-gray-disabled bg-[#f9f9f9] text-[14px] font-medium text-[#6e6e6e]"
                      >
                        <Image
                          src="/icons/Delete-deepgray.svg"
                          alt="삭제"
                          width={16}
                          height={16}
                        />
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                <p className="font-regular text-[14px] text-black">
                  {comment.content}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-regular text-[14px] text-gray-light">
                    {formatDate(comment.createdAt)}
                  </p>
                  {/* <button className="flex items-center gap-[4px]">
                    <Image
                      src="/icons/Favorite.svg"
                      alt="favorite"
                      width={18}
                      height={18}
                    />
                     <p className="font-regular text-[14px] text-gray-light">
                    {comment.likeCount}
                    </p>  
                  </button> */}
                </div>
                <div className="flex justify-start">
                  <button
                    onClick={() => handleReplyClick(String(comment.commentId))}
                    type="button"
                    className="h-[33px] w-[57px] cursor-pointer rounded-[4px] bg-link-default text-[14px] font-semibold text-white"
                  >
                    답글
                  </button>
                </div>
              </div>
              {/* 답글 입력 영역 */}
              {showReplyId === String(comment.commentId) && (
                <div className="relative flex flex-col gap-[16px] py-[24px] pl-[48px] before:absolute before:left-[18px] before:top-[24px] before:h-[10px] before:w-[10px] before:border-b before:border-l before:border-link-default">
                  <form onSubmit={() => submitReply()}>
                    <div>
                      <textarea
                        value={replyContent}
                        onChange={handleReplyChange}
                        className="h-[120px] w-full resize-none rounded-[8px] border border-gray-disabled p-[16px] text-sm text-gray-light"
                        placeholder="스터디에 관한 질문을 댓글로 남겨주세요."
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="h-[40px] w-[160px] cursor-pointer rounded-[4px] bg-link-default text-[14px] font-semibold text-white"
                      >
                        답글 등록
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <div>
                {visibleReplies.map((replyItem: Reply) => (
                  <div
                    key={replyItem.commentId}
                    className="relative flex flex-col gap-[16px] border-b border-gray-disabled py-[24px] pl-[48px] before:absolute before:left-[18px] before:top-[32px] before:h-[10px] before:w-[10px] before:border-b before:border-l before:border-link-default"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[4px]">
                        <Image
                          src="/icons/icon_no_profile.svg"
                          alt="user"
                          width={18}
                          height={18}
                        />
                        <p className="text-[14px] font-bold text-link-default">
                          {replyItem.nickname}
                        </p>
                        {replyItem.nickname === user?.data?.nickname && (
                          <span className="flex h-[33px] w-[60px] items-center justify-center rounded-[4px] bg-[#E7F3FF] text-[14px] font-medium text-link-default">
                            내 댓글
                          </span>
                        )}
                      </div>
                      {replyItem.nickname === user?.data?.nickname && (
                        <div className="flex items-center gap-[4px]">
                          <button
                            type="button"
                            className="flex h-[33px] w-[63px] cursor-pointer items-center justify-center gap-[2px] rounded-[4px] border border-gray-disabled bg-[#f9f9f9] text-[14px] font-medium text-[#6e6e6e]"
                          >
                            <Image
                              src="/icons/Edit-deepgray.svg"
                              alt="수정"
                              width={16}
                              height={16}
                            />
                            수정
                          </button>
                          <button
                            type="button"
                            className="flex h-[33px] w-[63px] cursor-pointer items-center justify-center gap-[2px] rounded-[4px] border border-gray-disabled bg-[#f9f9f9] text-[14px] font-medium text-[#6e6e6e]"
                          >
                            <Image
                              src="/icons/Delete-deepgray.svg"
                              alt="삭제"
                              width={16}
                              height={16}
                            />
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="font-regular text-[14px] text-black">
                      {replyItem.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-regular text-[14px] text-gray-light">
                        {formatDate(replyItem.createdAt)}
                      </p>
                      {/* <button
                        type="button"
                        className="flex items-center gap-[4px]"
                      >
                        <Image
                          src="/icons/Favorite.svg"
                          alt="favorite"
                          width={18}
                          height={18}
                        />
                        <p className="font-regular text-[14px] text-gray-light">
                          {reply.likeCount}
                        </p>
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
              {hasMoreReplies && (
                <div className="px-[16px] py-[27px]">
                  <button
                    onClick={() => handleLoadMore(String(comment.commentId))}
                    type="button"
                    className="flex cursor-pointer items-center gap-[4px] text-[14px] font-semibold text-[#828282]"
                  >
                    답글 3개 더보기
                    <Image
                      src="/icons/icon_select_arrow.svg"
                      alt="arrow"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <CommentForm studyId={studyId} />
      {isToast && <Toast isToast={isToast} message={message} />}

      <div className="mt-[24px] flex items-center justify-center gap-[10px]">
        <button
          onClick={() => setPage(0)}
          disabled={page === 0}
          className="cursor-pointer"
        >
          <Image
            src="/icons/AngleLeft2.svg"
            alt="arrow"
            width={14}
            height={14}
            className="rotate-180 transform"
          />
        </button>
        <button
          onClick={() => setPage((prev) => Math.max(0, prev - 1))}
          disabled={page === 0}
          className="cursor-pointer"
        >
          <Image
            src="/icons/AngleLeft.svg"
            alt="arrow"
            width={14}
            height={14}
            className="rotate-180 transform"
          />
        </button>
        {[
          ...Array(Math.min(Math.ceil(comments?.data?.totalPages ?? 1), 5)),
        ].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`text-[14px] ${
              page === i ? 'font-bold text-black' : 'text-[#828282]'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= Math.ceil((comments?.data?.totalPages ?? 1) - 1)}
          className="cursor-pointer"
        >
          <Image
            src="/icons/AngleLeft.svg"
            alt="arrow"
            width={14}
            height={14}
          />
        </button>
        <button
          onClick={() =>
            setPage(Math.ceil((comments?.data?.totalPages ?? 1) - 1))
          }
          disabled={page >= Math.ceil((comments?.data?.totalPages ?? 1) - 1)}
          className="cursor-pointer"
        >
          <Image
            src="/icons/AngleLeft2.svg"
            alt="arrow"
            width={14}
            height={14}
          />
        </button>
      </div>
    </Suspense>
  );
}
