'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function JoinComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div
      className="flex h-screen flex-col items-center justify-center gap-10"
      style={{ height: 'calc(100vh - 70px)' }}
    >
      <h1 className="text-2xl font-semibold">회원가입이 완료되었습니다.</h1>
      <p className="bg-blue-light w-full max-w-[432px] rounded-lg p-5 text-center text-[22px] font-semibold">
        {email}
      </p>
      <Button onClick={() => router.push('/login')} className="bg-blue-default">
        로그인 화면 바로가기
      </Button>
    </div>
  );
}
