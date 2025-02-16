'use client'

import { InputField } from "@/components/InputField";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { INPUT_ERROR_MESSAGE } from "@/utils/input-error-message";
import { Button } from "@/components/ui/button";
import { checkEmail, checkNickname, sendAuthCode } from "@/lib/api/signup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const signupSchema = z.object({
  name: z.string({required_error: INPUT_ERROR_MESSAGE.NAME})
    .min(2, INPUT_ERROR_MESSAGE.NAME)
    .regex(/^[가-힣a-zA-Z\s]+$/, INPUT_ERROR_MESSAGE.NAME),
  nickName: z.string({required_error: INPUT_ERROR_MESSAGE.NICKNAME.REQUIRED}).regex(/^[a-zA-Z0-9]+$/, INPUT_ERROR_MESSAGE.NICKNAME.HELPER_TEXT),
  email: z.string({required_error: INPUT_ERROR_MESSAGE.EMAIL.REQUIRED}).email(INPUT_ERROR_MESSAGE.EMAIL.INVALID_FORMAT),
  authCode: z.string().regex(/^\d*$/, "숫자만 입력 가능합니다.").length(6, "6자리 숫자를 입력해 주세요.").optional(),
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
  const [emailHelperText, setEmailHelperText] = useState<string>('');
  const [authCodeHelperText, setAuthCodeHelperText] = useState<string>('');
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);

  const nickname = watch('nickName');
  const email = watch('email');

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    const nickname = methods.getValues('nickName');

    try {
      const isAvailable = await checkNickname(nickname);

      if (isAvailable.data) {
        setError('nickName', {message: '이미 사용 중인 닉네임입니다.'});
        setIsNicknameChecked(false);
      } else {
        setNicknameHelperText('사용 가능한 닉네임입니다.');
        setIsNicknameChecked(true);
      }
    } catch (error) {
        console.error('Nickname check error:', error);
        toast.error('닉네임 확인 중 오류가 발생했습니다. 다시 시도해 주세요.', {
          duration: 3000,
        })
        setIsNicknameChecked(false);
    }
  }

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    const email = methods.getValues('email');

    try {
      const isAvailable = await checkEmail(email);

      if (isAvailable.data) {
        setError('email', {message: '이미 사용 중인 이메일입니다.'});
        setIsEmailChecked(false);
      } else {
        setEmailHelperText('사용 가능한 이메일입니다.');
        setIsEmailChecked(true);
      }
    } catch (error) {
      console.error('Email check error:', error);
      toast.error('이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.', {
        duration: 3000,
      })
      setIsEmailChecked(false);
    }
  }

// 인증번호 전송
const handleSendAuthCode = async () => {
  const email = methods.getValues('email');

  try {
    if (!errors.authCode) {
      await sendAuthCode(email);
      setAuthCodeHelperText('이메일로 인증번호를 발송했습니다.');
    }
  } catch (error) {
    console.error('Auth code send error:', error);
    toast.error('인증번호 전송 중 오류가 발생했습니다. 다시 시도해 주세요.', {
      duration: 3000,
    })
  }
}

// 닉네임이 변경되면 닉네임 체크 상태 초기화
useEffect(() => {
  setIsNicknameChecked(false);
  setNicknameHelperText(INPUT_ERROR_MESSAGE.NICKNAME.HELPER_TEXT);
}, [nickname]);

// 이메일이 변경되면 이메일 체크 상태 초기화
useEffect(() => {
  setIsEmailChecked(false);
  setEmailHelperText('');
}, [email]);

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
              buttonDisabled={!nickname || !!errors.nickName || isNicknameChecked}
            />
            <InputField
              name="email"
              label="이메일"
              type="text"
              placeholder="ex)studywithme@gmail.com"
              helperText={emailHelperText}
              buttonText="중복 확인"
              onButtonClick={handleCheckEmail}
              buttonDisabled={!email || !!errors.email || isEmailChecked}
            />
            <InputField
              name="authCode"
              label="인증번호 입력"
              type="text"
              placeholder="6자리 인증번호"
              helperText={authCodeHelperText}
              maxLength={6}
              buttonText="인증번호 받기"
              onButtonClick={handleSendAuthCode}
              buttonDisabled={!isEmailChecked}
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