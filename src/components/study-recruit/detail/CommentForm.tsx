'use client';

import { postComment } from '@/lib/api/study/postComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/ui/Toast';

export default function CommentForm({ studyId }: { studyId: string }) {
  const queryClient = useQueryClient();
  const [isToast, setIsToast] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const [content, setContent] = useState('');
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const { mutate: submitComment } = useMutation({
    mutationFn: () => postComment(studyId, content),
    onSuccess: (response) => {
        if (response.message === 'Expired Token') {
            setIsToast(true);
            setMessage('로그인이 만료되었습니다. 다시 로그인해주세요.');
            router.push('/login');
            return;
          }
        
      console.log('댓글 작성 성공', response);
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['comment', studyId] }); //댓글목록 새침고침
      console.log('댓글 작성 성공');
    },
    onError: (error) => {
      console.error('API Error:', error);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitComment();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name=""
          id=""
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={handleCommentChange}
        />
        <button type="submit">댓글 작성</button>
      </form>
      {isToast && <Toast isToast={isToast} message={message} />}
    </div>
  );
}
