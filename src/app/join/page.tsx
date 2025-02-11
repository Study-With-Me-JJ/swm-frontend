'use client'

import { InputField } from "@/components/InputField";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { INPUT_ERROR_MESSAGE } from "@/utils/input-error-message";
import { Button } from "@/components/ui/button";
import { checkNickname } from "@/lib/api/signup";
import { useState } from "react";
import toast from "react-hot-toast";

const signupSchema = z.object({
  name: z.string({required_error: INPUT_ERROR_MESSAGE.NAME})
    .min(2, INPUT_ERROR_MESSAGE.NAME)
    .regex(/^[가-힣a-zA-Z\s]+$/, INPUT_ERROR_MESSAGE.NAME),
  nickName: z.string({required_error: INPUT_ERROR_MESSAGE.NICKNAME.REQUIRED}).regex(/^[a-zA-Z0-9]+$/, INPUT_ERROR_MESSAGE.NICKNAME.HELPER_TEXT),
  email: z.string({required_error: INPUT_ERROR_MESSAGE.EMAIL.REQUIRED}).email(INPUT_ERROR_MESSAGE.EMAIL.INVALID_FORMAT),
  authCode: z.string(),
  password: z.string({required_error: INPUT_ERROR_MESSAGE.PASSWORD.REQUIRED}).min(8, INPUT_ERROR_MESSAGE.PASSWORD.HELPER_TEXT).max(20, INPUT_ERROR_MESSAGE.PASSWORD.HELPER_TEXT),
  passwordCheck: z.string({required_error: INPUT_ERROR_MESSAGE.PASSWORD_CHECK})
});


export default function Join() {
  const methods = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });
  
  const {watch, setError, formState: {errors}} = methods;
  const [nicknameHelperText, setNicknameHelperText] = useState<string>(INPUT_ERROR_MESSAGE.NICKNAME.HELPER_TEXT);

  const nickname = watch('nickName');

  const handleCheckNickname = async () => {
    const nickname = methods.getValues('nickName');

    try {
      const isAvailable = await checkNickname(nickname);

      if (isAvailable.data) {
        setError('nickName', {message: '이미 사용 중인 닉네임입니다.'});
      } else {
        setNicknameHelperText('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
        console.error('Nickname check error:', error);
        toast.error('닉네임 확인 중 오류가 발생했습니다. 다시 시도해 주세요.', {
          duration: 3000,
        })
    }
  }

    return (
      <div className='flex justify-center items-center m-16'>
        <FormProvider {...methods}>
          <form className='flex flex-col w-[432px] mx-5 gap-10'>
            <h1 className='text-2xl font-bold'>스터디 윗 미 회원가입</h1>

            <section className='flex flex-col gap-5'>
            <InputField
              name="name"
              label="이름"
              type="text"
              placeholder="이름을 입력해 주세요."
              helperText={INPUT_ERROR_MESSAGE.NAME}
            />
            <InputField
              name="nickName"
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해 주세요."
              helperText={nicknameHelperText}
              buttonText="중복 확인"
              onButtonClick={handleCheckNickname}
              buttonDisabled={!nickname || !!errors.nickName}
            />
            <InputField
              name="email"
              label="이메일"
              type="text"
              placeholder="ex)studywithme@gmail.com"
              buttonText="인증번호 받기"
            />
            <InputField
              name="authCode"

              label="인증번호 입력"
              type="text"
              placeholder="6자리 인증번호"
              maxLength={6}
              buttonText="확인"
            />
            <InputField

              name="password"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              helperText={INPUT_ERROR_MESSAGE.PASSWORD.HELPER_TEXT}
            />


            <InputField
              name="passwordCheck"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
            />
          </section>
          <Button className="bg-blue-default">가입하기</Button>
        </form>
      </FormProvider>
    </div>

    )
  }