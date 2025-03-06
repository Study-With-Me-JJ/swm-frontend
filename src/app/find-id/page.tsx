'use client';

import { findId } from '@/lib/api/find-id';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { INPUT_ERROR_MESSAGE } from '@/utils/input-error-message';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/ui/button';

const findIdSchema = z.object({
  name: z.string({ required_error: INPUT_ERROR_MESSAGE.NAME.REQUIRED }),
  email: z.string({ required_error: INPUT_ERROR_MESSAGE.EMAIL.REQUIRED }),
});

export default function FindId() {
  const methods = useForm<z.infer<typeof findIdSchema>>({
    resolver: zodResolver(findIdSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (data: { name: string; email: string }) => {
    try {
      const response = await findId(data.name, data.email);
      console.log(response);
    } catch (error) {
      console.error(error);
      // 추후 예외처리 필요
    }
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ height: 'calc(100vh - 70px)' }}
    >
      <FormProvider {...methods}>
        <form className="mx-5 flex w-[432px] flex-col gap-10">
          <h1 className="text-2xl font-bold">아이디 찾기</h1>

          <section className="flex flex-col gap-5">
            <InputField
              name="name"
              label="이름"
              type="text"
              placeholder="이름을 입력해 주세요."
            />
            <InputField
              name="email"
              label="가입 시 이메일"
              type="email"
              placeholder="이메일을 입력해 주세요."
            />
          </section>

          <section className="flex flex-col gap-5">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-default"
              disabled={!isValid || isSubmitting}
            >
              아이디 찾기
            </Button>
            <div className="flex justify-between px-10 text-sm text-gray-light">
              <Link href="/find-password">비밀번호 찾기</Link>
              <p>|</p>
              <Link href="/login">로그인</Link>
              <p>|</p>
              <Link href="/join">회원가입</Link>
            </div>
          </section>
        </form>
      </FormProvider>
    </div>
  );
}
